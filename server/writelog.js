var fs = require('fs');

module.exports.writelog = function(message){
  var now = '[' + new Date() + ']';
  fs.appendFile('server/server.log', now + ' ' + message + "\r\n", function(err){
      if(err){
          console.log(err);
          return;
      }
  })
}