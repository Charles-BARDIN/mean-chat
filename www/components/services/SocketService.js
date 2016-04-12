export default ['MessagesService', 'UserService', '$q', '$rootScope', (MessagesService, UserService, $q, $rootScope) => {
  let socket;

  const connectToSocket = () => {
    return $q((resolve, reject) => {
      socket = io.connect('http://' + location.host);

      // Set listener
      socket.on('messageRecovery', json => {
        // Actually resolve/reject promise => no need to $rootScope.$apply
        MessagesService.handleRecovery(json, {resolve: resolve, reject: reject});
      });

      socket.on('messageResponse', json => {
        $rootScope.$evalAsync(
          MessagesService.handleMessageResponse(json)
        );
      });

      socket.on('newMessage', json => {
        $rootScope.$evalAsync( () => {
          MessagesService.handleNewMessage(json);
        });
      });

      socket.on('connexionResponse', json => {
        if(json.valid){
          console.log('Connected to socket');
          $rootScope.$evalAsync(
            UserService.setConnectedUsers(json.connectedUsers)
          );
        }
      });

      socket.on('userConnect', json => {
        $rootScope.$evalAsync(
          UserService.addConnectedUser()
        );
      })

      socket.on('userDisconnect', json => {
        $rootScope.$evalAsync(
          UserService.removeConnectedUser()
        );
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