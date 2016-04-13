export default [() => {
  return {
    restrict: 'A',
    scope: {
      submit: "&submit"
    },
    require: [
      'ngModel'
    ],
    link: (scope, elem, attrs, ngModel) => {
      const onKeyDown = $event => {
        if ($event.which === 13 && !$event.shiftKey){
          $event.preventDefault();
          scope.submit();
        }
      };

      elem[0].addEventListener('keydown', onKeyDown);
    }
  };
}]