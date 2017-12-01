var app   = require('express')();
var http  = require('http').Server(app);
var io  = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('join', function(room) {
    console.log('a user joined room: ', room);
    socket.join(room);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('play sound at', function(id){
    console.log('play sound at', id);
    socket.broadcast.to(id).emit('play sound');
  });

});
