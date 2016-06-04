export default [() => {
  return {
    restrict: 'E',
    scope: {
      caret: "=caretPos",
      text: "=model",
      input: '=input'
    },
    controller: ['$scope', ($scope) => {
      const boldClick = () => {
        let pos = $scope.caret.get;
        if($scope.text){
          // $scope.text = $scope.text.substring(0, pos) + '[b]' + $scope.text.substring(pos - 1, $scope.caret.selectionLength) + '[/b]' + $scope.text.substring(pos - 1 + $scope.caret.selectionLength);
          console.log($scope.caret.selectionLength)
          if($scope.caret.selectionLength === 0){
            $scope.text = $scope.text.substring(0, pos) + '[b][/b]' + $scope.text.substring($scope.caret.get);
          } else {
            // if(pos){
            //   $scope.text = $scope.text.substring(0, pos) + '[b]' + $scope.text.substring(pos, $scope.caret.selectionLength + 1) + '[/b]';
            // } else {
            //   $scope.text = '[b]' + $scope.text.substring(0, $scope.caret.selectionLength + 1) + '[/b]';
            // }
          }
        } else {
          $scope.text = '[b][/b]';
        }

        $scope.input.focus();
        $scope.$parent.$emit('messModif', 3);
      };
      
      const italicClick = () => {
        if($scope.text){
          $scope.text = $scope.text.substring(0, $scope.caret.get) + '[i][/i]' + $scope.text.substring($scope.caret.get);
        } else {
          $scope.text = '[i][/i]';
        }

        $scope.input.focus();
        $scope.$parent.$emit('messModif', 3);
      };
      
      const underlineClick = () => {
        if($scope.text){
          $scope.text = $scope.text.substring(0, $scope.caret.get) + '[u][/u]' + $scope.text.substring($scope.caret.get);
        } else {
          $scope.text = '[u][/u]';
        }

        $scope.input.focus();
        $scope.$parent.$emit('messModif', 3);
      };

      const codeClick = () => {
        if($scope.text){
          $scope.text = $scope.text.substring(0, $scope.caret.get) + '[code][/code]' + $scope.text.substring($scope.caret.get);
        } else {
          $scope.text = '[code][/code]';
        }

        $scope.input.focus();
        $scope.$parent.$emit('messModif', 6);
      };
      
      const linkClick = () => {
      };
      
      const smileyClick = () => {
      };
      
      $scope.boldClick = boldClick;
      $scope.italicClick = italicClick;
      $scope.underlineClick = underlineClick;
      $scope.linkClick = linkClick;
      $scope.codeClick = codeClick;
      $scope.smileyClick = smileyClick;
    }],
    template: '' + 
    '<md-toolbar layout="row" layout-align="space-between center" class="md-menu-toolbar">' +
      '<md-button aria-label="bold" class="md-raised" flex ng-click="boldClick()">' + 
        '<ng-md-icon icon="format_bold" layout="column" layout-align="center center"></ng-md-icon>' +
      '</md-button>' +
      '<md-button aria-label="italic" class="md-raised" flex ng-click="italicClick()">' + 
        '<ng-md-icon icon="format_italic" layout="column" layout-align="center center"></ng-md-icon>' +
      '</md-button>' +
      '<md-button aria-label="underline" class="md-raised" flex ng-click="underlineClick()">' + 
        '<ng-md-icon icon="format_underline" layout="column" layout-align="center center"></ng-md-icon>' +
      '</md-button>' +
      '<md-button aria-label="code" class="md-raised" flex ng-click="codeClick()">' + 
        '<ng-md-icon icon="code" layout="column" layout-align="center center"></ng-md-icon>' +
      '</md-button>' +
      '<md-button aria-label="link" class="md-raised" flex ng-click="linkClick()">' + 
        '<ng-md-icon icon="insert_link" layout="column" layout-align="center center"></ng-md-icon>' +
      '</md-button>' +
      '<md-button aria-label="smiley" class="md-raised" flex ng-click="smileyClick()">' + 
        '<ng-md-icon icon="face" layout="column" layout-align="center center"></ng-md-icon>' +
      '</md-button>' + 
    '</md-toolbar>'
  };
}];