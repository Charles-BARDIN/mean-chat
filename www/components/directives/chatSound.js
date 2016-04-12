export default () => {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      connectSound: '=connectSound', 
      messageSound: '=messageSound', 
      volume: '=volume', 
      trigger: '@trigger'
    },
    controller: [ '$scope', '$element', 'MessageEventService', 'UserEventService', 
    ($scope, $element, MessageEventService, UserEventService) => {
      var els = $element.children();
      $scope.$watch('volume', () => {
        for(let i = 0; i < els.length; i++)
          els[i].volume = $scope.volume;
      });

      MessageEventService.listenToNewMessage(() => { els[0].play(); });
      UserEventService.listenToNewUserConnection(() => { els[1].play(); });

    }],
    template: '' + 
    '<div id="chatSound" style="display: none">' + 
      '<audio ng-src="{{messageSound}}"></audio>' + 
      '<audio ng-src="{{connectSound}}"></audio>' + 
    '</div>'
  };
}