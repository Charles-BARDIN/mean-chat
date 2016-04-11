import icons from './../../images/smilies/smilies';

export default () => {
  return input => {
    for(var iconName in icons){
      input = input.replace('::' + iconName + '::', 
                            '<img src="' + icons[iconName] + '" ' + 
                            'alt="' + iconName + '" />');
    }

    input = input.replace(':\'(', '<img src="' + icons['cry'] + '" alt="cry" />');
    input = input.replace(':\'-(', '<img src="' + icons['cry'] + '" alt="cry" />');
    input = input.replace(':)', '<img src="' + icons['smile'] + '" alt="smile" />');
    input = input.replace(':-)', '<img src="' + icons['smile'] + '" alt="smile" />');
    input = input.replace(':D', '<img src="' + icons['biggrin'] + '" alt="biggrin" />');
    input = input.replace(':-D', '<img src="' + icons['biggrin'] + '" alt="biggrin" />');
    input = input.replace(':(', '<img src="' + icons['sad'] + '" alt="sad" />');
    input = input.replace(':-(', '<img src="' + icons['sad'] + '" alt="sad" />');
    input = input.replace(':S', '<img src="' + icons['confused'] + '" alt="confused" />');
    input = input.replace(':-S', '<img src="' + icons['confused'] + '" alt="confused" />');
    input = input.replace('8)', '<img src="' + icons['cool'] + '" alt="cool" />');
    input = input.replace('8-)', '<img src="' + icons['cool'] + '" alt="cool" />');
    input = input.replace(':O', '<img src="' + icons['surprised'] + '" alt="surprised" />');
    input = input.replace(':-O', '<img src="' + icons['surprised'] + '" alt="surprised" />');
    input = input.replace(';)', '<img src="' + icons['wink'] + '" alt="wink" />');
    input = input.replace(';-)', '<img src="' + icons['wink'] + '" alt="wink" />');
    input = input.replace('oO', '<img src="' + icons['eek'] + '" alt="eek" />');
    input = input.replace(':@', '<img src="' + icons['mad'] + '" alt="mad" />');
    input = input.replace(':-@', '<img src="' + icons['mad'] + '" alt="mad" />');
    input = input.replace(':|', '<img src="' + icons['neutral'] + '" alt="neutral" />');
    input = input.replace(':-|', '<img src="' + icons['neutral'] + '" alt="neutral" />');

    return input;
  }
}