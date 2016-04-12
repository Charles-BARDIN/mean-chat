export default ['$rootScope', ($rootScope) => {
  const listenToNewUserConnection = callback => {
    return $rootScope.$on('newUserConnection', () => {
      callback();
    });
  };

  const emitNewUserConnection = () => {
    $rootScope.$emit('newUserConnection');
  };

  return {
    listenToNewUserConnection: listenToNewUserConnection,
    emitNewUserConnection: emitNewUserConnection
  };
}];