export default ['$rootScope', ($rootScope) => {
  let userConnected = {number: 1};

  const addConnectedUser = () => {
    
    $rootScope.$apply(() => {
      userConnected.number++;
      console.log('add connected user: ' + userConnected);
    })
  };

  const removeConnectedUser = () => {
    $rootScope.$apply(() => {
      userConnected.number--;
      console.log('remove connected user: ' + userConnected);
    })
  };

  const getConnectedUser = () => {
    console.log("get connected user: " + userConnected)
    return userConnected;
  };

  const setConnectedUsers = val => {
    console.log('set connected user: ' + userConnected)
    userConnected.number = val;
  }

  return {
    addConnectedUser: addConnectedUser,
    removeConnectedUser: removeConnectedUser,
    getConnectedUser: getConnectedUser,
    setConnectedUsers: setConnectedUsers
  }
}];