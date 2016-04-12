export default ['UserEventService', (UserEventService) => {
  let userConnected = {number: 1};

  const addConnectedUser = () => {
    userConnected.number++;
    UserEventService.emitNewUserConnection();
  };

  const removeConnectedUser = () => {
    userConnected.number--;
  };

  const getConnectedUser = () => {
    return userConnected;
  };

  const setConnectedUsers = val => {
    userConnected.number = val;
  }

  return {
    addConnectedUser: addConnectedUser,
    removeConnectedUser: removeConnectedUser,
    getConnectedUser: getConnectedUser,
    setConnectedUsers: setConnectedUsers
  }
}];