export default ['$window', ($window) => {
  let isFocused = { value: true };

  $window.onfocus = () => {
    isFocused.value = true;
  };

  $window.onblur = () => {
    isFocused.value = false;
  };

  const getFocus = () => {
    return isFocused;
  };

  const setFocusEvent = (callback, triggerOnce) => {
    let trigered = false;

    $window.onfocus =  () => {
      if(!trigered){
        callback();
        if(triggerOnce)
          trigered = true;
      }
    };
  };

  const setBlurEvent = (callback) => {
    
  };

  return {
    getFocus: getFocus,
    setFocusEvent: setFocusEvent,
    setBlurEvent: setBlurEvent
  };
}];