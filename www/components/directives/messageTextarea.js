export default [() => {
  return {
    restrict: 'E',
    template: '' +
    '<md-input-container layout="row" flex> ' +
      '<label>Message</label>' +
      '<textarea ng-model="newMess" ' +
              'name="newMess"' +
              'aria-label="message" ' +
              'ng-maxlength="maxLength" ' +
              'submit="submit()" ' +
              'required ' +
              'special-enter ' +
              'set-touched-on-focus' +
              'add-text-bar' +
      '>' +
      '</textarea>' +
      '<div ng-messages="newMess.$error" multiple md-auto-hide="true">' +
        '<div ng-message="required">' +
          'You must enter a message.' +
        '</div>' +
        '<div ng-message="maxlength">' +
          'The max size for the message is {{maxLength}}.' +
        '</div>' +
      '</div>' +
    '</md-input-container>'
  }
}];