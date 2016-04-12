import icons from './../../images/smilies/smilies';

export default () => {
  return input => {
    for(let i = 0, item; i < icons.length; i++){
        item = icons[i];
        for(let j = 0; j < item.tags.length; j++){
            input = input.replace(item.tags[j], 
                                '<img src="' + item.icon + '" ' + 
                                'alt="' + item.name + '" />');
        }
    }
    return input;
  }
}