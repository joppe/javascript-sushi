var app   = require('express')();
var http  = require('http').Server(app);
var io  = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('clients', Object.keys(io.sockets.clients().sockets));

  socket.on('disconnect', function(){
    console.log('user disconnected');

    socket.emit('clients', Object.keys(io.sockets.clients().sockets));
  });

  socket.on('play sound at', function(id){
    socket.to(id).emit('play sound');
  });
});
