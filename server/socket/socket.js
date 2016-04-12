var db = require('./../db/crud');
var messageCache = require('./../caches/message');

var userConnected = 0;

module.exports.initSocket = function(server){
  var io = require('socket.io')(server);

  io.sockets.on('connection', function (socket) {
    console.log(new Date() + ': client connected to socket ' + socket.id);
    userConnected++;

    // Emit connexion success and message table
    socket.emit('connexionResponse', {
        valid: true,
        connectedUsers: userConnected
    });
    console.log(new Date() + ': connexionResponse sent on socket ' + socket.id);

    socket.emit('messageRecovery', {
        messTable: messageCache.getMessageCollection()
    });
    console.log(new Date() + ': messageRecovery sent on socket ' + socket.id);

    socket.broadcast.emit('userConnect');
    console.log(new Date() + ': connexion to socket ' + socket.id + ' broadcasted');

    // Set events
    socket.on('message', function (message) {
      console.log(new Date() + ': message recieved from socket ' + socket.id);
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
          console.log(new Date() + ': messageResponse of message ' + results.message_id + ' sent');

          socket.broadcast.emit('newMessage', {
            message: results
          });
          console.log(new Date() + ': message ' + results.message_id + ' broadcasted');
        }
      });
    });

    socket.on('disconnect', function() {
        console.log(new Date() + ': client disconnected of socket ' + socket.id);
        userConnected--;
        socket.broadcast.emit('userDisconnect');
    })
  });

  console.log(new Date() + ': socket initialized...')
};