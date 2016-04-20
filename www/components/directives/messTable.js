export default () => {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      data: '='
    },
    template: '' + 
    '<md-content>' +
      '<md-list>' + 
        '<md-list-item ng-repeat="mess in data track by mess._id">' +
          '<md-card class="mess__wrapper" flex>' + 
            '<md-card-title>' +
              '<md-card-title-text class="mess__header" layout="row" layout-align="space-between center">' +
                '<span class="md-headline">{{mess.username}}</span>' +
                '<span class="md-subhead mess__time">{{mess.time | date:\'medium\'}}</span>' +
              '</md-card-title-text>' +
            '</md-card-title>' +
            '<md-card-content ng-bind-html="mess.content">' + 
            '</md-card-content>' +
          '</md-card>' + 
        '</md-list-item>' +
      '</md-list>' +
    '</md-content>'
  };
}