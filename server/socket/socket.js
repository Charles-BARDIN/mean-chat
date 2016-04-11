var db = require('./../db/crud');
var messageCache = require('./../caches/message');

module.exports.initSocket = function(server){
  var io = require('socket.io')(server);
  io.sockets.on('connection', function (socket) {
    console.log('Client connected: ' + socket.id);

    // Emit connexion success and message table
    socket.emit('connexionResponse', {
        valid: true
    });

    socket.emit('messageRecovery', {
        messTable: messageCache.getMessageCollection()
    });

    // Set events
    socket.on('message', function (message) {
      db.addMessage(message, function(err, results){
        if(err){
          socket.emit('messageResponse', {
            fault: fault
          })
        } else {
          socket.emit('messageResponse', {
            message: results
          });

          socket.broadcast.emit('newMessage', {
            message: results
          });
        }
      });
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected: ' + socket.id);
    })
  });
};