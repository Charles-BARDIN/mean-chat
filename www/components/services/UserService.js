export default ['$rootScope', ($rootScope) => {
  let userConnected = {number: 1};

  const addConnectedUser = () => {
    
    $rootScope.$apply(() => {
      userConnected.number++;
    })
  };

  const removeConnectedUser = () => {
    $rootScope.$apply(() => {
      userConnected.number--;
    })
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