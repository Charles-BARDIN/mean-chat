var db = require('./../db/crud');
var messageCache = require('./../caches/message');
var writelog = require('./../writelog').writelog;
var TYPE = 'SOCKET'

var userConnected = 0;

module.exports.initSocket = function(server){
  var io = require('socket.io')(server);

  io.sockets.on('connection', function (socket) {
    writelog('Client connected to socket ' + socket.id, TYPE);
    userConnected++;

    // Emit connexion success and message table
    socket.emit('connexionResponse', {
        valid: true,
        connectedUsers: userConnected
    });
    writelog('connexionResponse sent on socket ' + socket.id, TYPE);

    socket.emit('messageRecovery', {
        messTable: messageCache.getMessageCollection()
    });
    writelog('messageRecovery sent on socket ' + socket.id, TYPE);

    socket.broadcast.emit('userConnect');
    writelog('Connexion to socket ' + socket.id + ' broadcasted', TYPE);

    // Set events
    socket.on('message', function (message) {
      writelog('Message recieved from socket ' + socket.id + ': ' + JSON.stringify(message), TYPE);
      message.socket_id = socket.id;
      db.addMessage(message, function(err, results){
        if(err){
          socket.emit('messageResponse', {
            fault: err
          })
          
        } else {
          socket.emit('messageResponse', {
            message: results
          });
          writelog('messageResponse sent: ' + JSON.stringify(results), TYPE);

          socket.broadcast.emit('newMessage', {
            message: results
          });
          writelog('Message broadcasted: ' + JSON.stringify(results), TYPE);
        }
      });
    });

    socket.on('disconnect', function() {
        writelog('Client disconnected of socket ' + socket.id, TYPE);
        userConnected--;

        socket.broadcast.emit('userDisconnect');
        writelog('Client disconnected of socket ' + socket.id + ' broadcasted', TYPE);
    })
  });

  writelog('Socket initialized', TYPE);
};