import config from 'components/constants';

export default ['$rootScope', '$interval', '$timeout', ($rootScope, $interval, $timeout) => {
  let interval;
  let currentState;

  const onStateChangeSuccess = (event, toState, toParams, fromState, fromParams, options) => { 
    $rootScope.pageTitle = toState.title;
    currentState = toState;
  };

  onStateChangeSuccess(null, {title: 'Chat'});

  $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

  const newMessage = () => {
    if(!interval){
      interval = $interval(() => {
        $timeout(() => {
          $rootScope.pageTitle = currentState.title;
        }, config.newMessage.hide.TIME);
        
        $rootScope.pageTitle = (`${currentState.title} - ${config.newMessage.show.TEXT}`);
      }, config.newMessage.show.TIME + config.newMessage.hide.TIME);
    }
  };

  const stopInterval = () => {
    if(interval){
      $interval.cancel(interval);
      interval = null;
      $rootScope.pageTitle = currentState.title;
    }
  };

  return {
    stopInterval: stopInterval,
    newMessage: newMessage
  }
}];