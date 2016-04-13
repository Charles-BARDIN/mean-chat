export default [() => {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, elem, attrs, ngModel) => {
      const setTouched = () => {
        ngModel.$setTouched();
        elem[0].removeEventListener('focus', setTouched, false);
      };

      elem[0].addEventListener('focus', setTouched, false);
    }
  };
}]