export default () => {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      data: '='
    },
    controller: ['$scope', $scope => {
      $scope.$on('newMessage', (ev, message) => {
        $scope.$apply( () => {
          $scope.data.unshift(message.message);
        });
      })
    }],
    template: '<div><div ng-repeat="mess in data track by mess.message_id">' +
      '<span class="mess__username">{{mess.username}}</span>' +
      '<span class="mess__time"> - {{mess.time | date:\'medium\'}}</span>' +
      '<p class="mess__content" ng-bind-html="mess.content | smiley"></p>' +
      '<div ng-if="(!$last)" class="divider"></div>' +
      '</div>'
  };
}