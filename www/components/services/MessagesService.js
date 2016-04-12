import config from 'components/constants';

export default ['$window', 'TitleService', '$q', '$rootScope', '$filter', ($window, TitleService, $q, $rootScope, $filter) => {
  let messagesCollection = [];
  let isFocused = true;

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

  const handleRecovery = (json, promise) => {
    if(!json.fault){
      messagesCollection = json.messTable;
      if(messagesCollection.length > MAX_MESSAGE_DISPLAYED){
        messagesCollection.splice(0, MAX_MESSAGE_DISPLAYED);
      }
      promise.resolve();
    }
    else {
      console.log('Fault: ' + json.fault);
      promise.reject();
    }
  };

  const handleMessageResponse = (json) => {
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
  };

  const handleNewMessage = (json) => {
    if(!json.fault){
      if(!isFocused){
        TitleService.newMessage();
      }

      // Sending newMessage event to the chat-sound directive and the message ng-repeat
      $rootScope.$broadcast('newMessage', {message: json.message});
    }
  };

  return {
    getMessages: getMessages,
    handleNewMessage: handleNewMessage,
    handleMessageResponse: handleMessageResponse,
    handleRecovery: handleRecovery,
    getFocus: () => {return isFocused;}
  }
}];