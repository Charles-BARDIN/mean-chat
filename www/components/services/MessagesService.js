import config from 'components/constants';

export default ['SocketService', '$window', 'TitleService', '$q', '$rootScope', '$filter', (SocketService, $window, TitleService, $q, $rootScope, $filter) => {
  let messagesCollection = [];
  let isFocused = true;
  let socket;

  const MAX_MESSAGE_DISPLAYED = config.MAX_MESSAGE_DISPLAYED;

  $window.onfocus = () => {
    isFocused = true;

    TitleService.stopInterval();
  };

  $window.onblur = () => {
    isFocused = false;
  };

  const getMessages = () => {
    return messagesCollection;
  }

  const recoverAndSetSocket = () => {
    return $q((resolve, reject) => {
      socket = SocketService.connectToSocket();

      socket.on('messageRecovery', json => {
        if(!json.fault){
            messagesCollection = json.messTable;
            if(messagesCollection.length > MAX_MESSAGE_DISPLAYED){
              messagesCollection.splice(0, MAX_MESSAGE_DISPLAYED);
            }
            resolve();
        }
        else {
          console.log('Fault: ' + json.fault);
          reject();
        }
      });

      socket.on('messageResponse', json => {
        if(json.fault){
          console.log('Failed to deliver the message: ' + json.fault);
        } else {
          messagesCollection.unshift(json.message);
          if(messagesCollection.length > MAX_MESSAGE_DISPLAYED)
            messagesCollection.pop();

          // TODO : This has been added to update the view when recieving a confirmation
          // Need to find another way
          $rootScope.$digest();
        }
      });

      socket.on('newMessage', json => {
        if(!json.fault){
          if(!isFocused){
            TitleService.newMessage();
          }

          // Sending newMessage event to the chat-sound directive and the message ng-repeat
          $rootScope.$broadcast('newMessage', {message: json.message});
        }
      });

      socket.on('connexionResponse', json => {
        if(json.valid){
          console.log('Connected to socket');
        }
      });
    });
  };

  const sendMessage = message => {
    return $q((resolve, reject) => {
      if(message.username && message.content)
        socket.emit('message', message);
    });
  }

  return {
    getMessages: getMessages,
    getFocus: () => {return isFocused;},
    recoverAndSetSocket: recoverAndSetSocket,
    sendMessage: sendMessage
  }
}];