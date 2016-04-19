var db = require('./../db/crud');
var messageCache = require('./../caches/message');
var writelog = require('./../writelog').writelog;

var userConnected = 0;

module.exports.initSocket = function(server){
  var io = require('socket.io')(server);

  io.sockets.on('connection', function (socket) {
    writelog('client connected to socket ' + socket.id);
    userConnected++;

    // Emit connexion success and message table
    socket.emit('connexionResponse', {
        valid: true,
        connectedUsers: userConnected
    });
    writelog('connexionResponse sent on socket ' + socket.id);

    socket.emit('messageRecovery', {
        messTable: messageCache.getMessageCollection()
    });
    writelog('messageRecovery sent on socket ' + socket.id);

    socket.broadcast.emit('userConnect');
    writelog('connexion to socket ' + socket.id + ' broadcasted');

    // Set events
    socket.on('message', function (message) {
      writelog('message recieved from socket ' + socket.id);
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
          writelog('messageResponse of message ' + results.message_id + ' sent');

          socket.broadcast.emit('newMessage', {
            message: results
          });
          writelog('message ' + results.message_id + ' broadcasted');
        }
      });
    });

    socket.on('disconnect', function() {
        writelog('client disconnected of socket ' + socket.id);
        userConnected--;

        socket.broadcast.emit('userDisconnect');
        writelog('client disconnected of socket ' + socket.id + ' broadcasted');
    })
  });

  writelog('socket initialized');
};