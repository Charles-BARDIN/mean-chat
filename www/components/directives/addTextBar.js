const getPos = (element) => {
  if ('selectionStart' in element) {
    return element.selectionStart;
  } else if (document.selection) {
    element.focus();
    let sel = document.selection.createRange();
    let selLen = document.selection.createRange().text.length;
    sel.moveStart('character', -element.value.length);
    return sel.text.length - selLen;
  }
};

const setPos = (element, caretPos) => {
  if (element.createTextRange) {
    let range = element.createTextRange();
    range.move('character', caretPos);
    range.select();
  } else {
    element.focus();
    if (element.selectionStart !== undefined) {
      element.setSelectionRange(caretPos, caretPos);
    }
  }
}


export default [() => {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      console.log(element[0])
      scope.ebCaret = {};
      element.on('keydown keyup click', function(event) {
        scope.$apply(function() {
          scope.ebCaret.get = getPos(element[0]);
        });
        console.log(scope.ebCaret.get)
      });

      scope.$watch('ebCaret.set', function(newVal) {
        if (typeof newVal === 'undefined') return;
          setPos(element[0], newVal);
      });
    },
    transclude: true,
    template: '<div><div>de</div><div ng-transclude></div ng-transclude></div>'
  }
}]