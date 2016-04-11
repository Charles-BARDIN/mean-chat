export default () => {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      srcSound: '='
    },
    controller: [ '$scope', $scope => {
    }],
    link: {
      pre: (scope, element, attrs) => {
        const audioEl = element[0];
        scope.audioEl = audioEl;

        scope.$on('newMessage', (ev, message) => {
          if(audioEl.volume)
            audioEl.play();
        })

        scope.$on('volumeChange', (ev, volume) => {
          switch(volume){
            case -1:
              audioEl.volume = 0;
              break;
            case 0:
              audioEl.volume = 0.4;
              break;
            case 1:
              audioEl.volume = 1;
              break;
            default:
              console.warn('Wrong volume setting');
          };
        })
      }
    },
    template: '<audio id="chatSound" style="display: none" ng-src="{{srcSound}}"></audio>'
  };
}