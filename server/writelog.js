var fs = require('fs');

var formatTwoDigit = function(num){
  return num < 10 ? '0' + num : num;
};

module.exports.writelog = function(message, type){
  if(!type){
    type = '[UNKNOWN]';
  } else {
    type = '[' + type.toUpperCase() + ']';
  }
  var now = new Date();
  var timeZone = -now.getTimezoneOffset()/60
  now = '[' + 
          formatTwoDigit(now.getMonth() + 1) + '/' + 
          formatTwoDigit(now.getDate()) + '/' + 
          now.getFullYear() + ' ' + 
          formatTwoDigit(now.getHours()) + ':' + 
          formatTwoDigit(now.getMinutes()) + ':' + 
          formatTwoDigit(now.getSeconds()) + ' GMT' + 
          (timeZone > 0 ? '+':'-') + timeZone + 
        ']';
  
  fs.appendFile('server/server.log', now + ' ' + type + ' ' + message + "\r\n", function(err){
    if(err){
      console.log(err);
      return;
    }
  })
}