export default ['MessagesService', 'UserService', '$q', (MessagesService, UserService, $q) => {
  let socket;

  const connectToSocket = () => {
    return $q((resolve, reject) => {
      socket = io.connect('http://' + location.host);

      // Set listener
      socket.on('messageRecovery', json => {
        MessagesService.handleRecovery(json, {resolve: resolve, reject: reject});
      });

      socket.on('messageResponse', json => {
        MessagesService.handleMessageResponse(json);
      });

      socket.on('newMessage', json => {
        MessagesService.handleNewMessage(json);
      });

      socket.on('connexionResponse', json => {
        if(json.valid){
          console.log('Connected to socket');
          UserService.setConnectedUsers(json.connectedUsers);
        }
      });

      socket.on('userConnect', json => {
        UserService.addConnectedUser();
      })

      socket.on('userDisconnect', json => {
        UserService.removeConnectedUser();
      })
    })
  }

  const isConnected = () => { 
    return socket ? true : false; 
  };

  const getSocket = () => {
    return socket;
  };

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  return {
    isConnected: isConnected,
    getSocket: getSocket,
    connectToSocket: connectToSocket,
    sendMessage: sendMessage
  }
}];