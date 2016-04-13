export default ['$rootScope', ($rootScope) => {
  const listenToNewMessage = callback => {
    return $rootScope.$on('newMessage', () => {
      callback();
    });
  };

  const emitNewMessage = () => {
    $rootScope.$emit('newMessage');
  };

  return {
    listenToNewMessage: listenToNewMessage,
    emitNewMessage: emitNewMessage
  };
}]