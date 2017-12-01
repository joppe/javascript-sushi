var app   = require('express')();
var http  = require('http').Server(app);
var io  = require('socket.io')(http, {pingInterval: 1000, pingTimeout: 2000});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  // Send connected clients to sender
  io.emit('clients', Object.keys(io.sockets.clients().sockets));

  socket.on('disconnect', function(){
    // Send connected clients to everyone else
    io.emit('clients', Object.keys(io.sockets.clients().sockets));
  });

  socket.on('play', function(clientId, callerId){
    socket.broadcast.to(clientId).emit('playSound', callerId);
  });

  socket.on('latency', function(clientId, latency){
    socket.broadcast.to(clientId).emit('remoteDelay', latency);
  });
});
