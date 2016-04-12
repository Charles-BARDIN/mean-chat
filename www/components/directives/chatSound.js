export default () => {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      srcSound: '=srcSound', 
      volume: '=volume', 
      trigger: '@trigger'
    },
    controller: [ '$scope', '$element', 'MessageEventService', ($scope, $element, MessageEventService) => {
      let el = $element[0];

      $scope.$watch('volume', () => {
        el.volume = $scope.volume;
      });

      MessageEventService.listenToNewMessage(() => { el.play(); });
    }],
    template: '<audio id="chatSound" style="display: none" ng-src="{{srcSound}}"></audio>'
  };
}