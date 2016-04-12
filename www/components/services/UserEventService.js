export default ['$rootScope', ($rootScope) => {
  const listenToUserConnectionChange = callback => {
    return $rootScope.$on('userConnectionChange', () => {
      callback();
    });
  };

  return {
    listenToUserConnectionChange: listenToUserConnectionChange
  };
}];