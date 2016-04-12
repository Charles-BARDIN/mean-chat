export default [() => {
  let userConnected = {number: 1};

  const addConnectedUser = () => {
    userConnected.number++;
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