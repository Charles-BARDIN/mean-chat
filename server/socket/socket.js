var db = require('./../db/crud');
var messageCache = require('./../caches/message');

var userConnected = 0;

module.exports.initSocket = function(server){
  var io = require('socket.io')(server);

  io.sockets.on('connection', function (socket) {
    var mustAddAUser = true;

    console.log('Client connected to socket: ' + socket.id);

    // Emit connexion success and message table
    socket.emit('connexionResponse', {
        valid: true,
        connectedUsers: userConnected + 1
    });

    socket.emit('messageRecovery', {
        messTable: messageCache.getMessageCollection()
    });

    // Set events
    socket.on('message', function (message) {
      if(mustAddAUser){
        mustAddAUser = false;
        userConnected++;

        socket.broadcast.emit('userConnect');

        socket.on('disconnect', function(){
          socket.broadcast.emit('userDisconnect');
          userConnected--;
        });
      }
      db.addMessage(message, function(err, results){
        if(err){
          socket.emit('messageResponse', {
            fault: err
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
        console.log('Client disconnected to socket: ' + socket.id);
    })
  });

  console.log("Socket initialized...")
};