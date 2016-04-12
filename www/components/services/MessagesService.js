import config from 'components/constants';

export default ['WindowService', 'TitleService', '$q', '$filter', 'MessageEventService',
(WindowService, TitleService, $q, $filter, MessageEventService) => {
  let messagesCollection = [];
  let focus = WindowService.getFocus();

  const getMessages = () => {
    return messagesCollection;
  }

  const handleRecovery = (json, promise) => {
    if(!json.fault){
      messagesCollection = json.messTable;
      if(messagesCollection.length > config.MAX_MESSAGE_DISPLAYED){
        messagesCollection.splice(0, config.MAX_MESSAGE_DISPLAYED);
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
      if(messagesCollection.length > config.MAX_MESSAGE_DISPLAYED)
        messagesCollection.pop();
    }
  };

  const handleNewMessage = (json) => {
    if(!json.fault){
      if(!focus.value){
        TitleService.newMessage();
      }

      messagesCollection.unshift(json.message);
      if(messagesCollection.length > config.MAX_MESSAGE_DISPLAYED){
        messagesCollection.splice(0, config.MAX_MESSAGE_DISPLAYED);
      }

      MessageEventService.emitNewMessage();
    }
  };

  return {
    getMessages: getMessages,
    handleNewMessage: handleNewMessage,
    handleMessageResponse: handleMessageResponse,
    handleRecovery: handleRecovery
  }
}];