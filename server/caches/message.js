var Entities = require('html-entities').AllHtmlEntities;

var config = require('./../constants');
var db = require('./../db/crud');
var socketIo = require('./../socket/socket');

var entities = new Entities();
var parser = require('./../bbcode/bbcode');

var messageCollection = [];
var message_id = 0;

var addMessage = function(message, callback){
  messageToSend = {
    username: entities.decode(message.username),
    content: entities.decode(message.content),
    message_id: message.message_id,
    time: message.time
  };

  messageCollection.unshift(messageToSend);

  if(messageCollection.length > config.CACHE_LIMIT){
    messageCollection.pop();
  }

  console.log(new Date() + ': message ' + message.message_id + ' have been added to cache');

  if(callback){
    callback(null, messageToSend);
  }
};

// Exports
module.exports.addMessage = addMessage;

module.exports.getMessageCollection = function(){
  return messageCollection;
};

module.exports.loadFromDB = function(callback){
  messFromDb = db.findAllMessages(config.CACHE_LIMIT, function(err, results){
    if(results){
      for(var i = 0; i < results.length; i++){
        addMessage(results[results.length - (i + 1)]);
      }
      console.log(new Date() + ': ' + results.length + ' message(s) recovered from database')
      
      db.getLastMessageID(function(err, result){
        if(!err){
          if(result){
            message_id = result;
          }
          console.log(new Date() + ': next message ID set to ' + message_id);

          if(callback){
            callback();
          }
        }
      })
    }
  });
};

module.exports.checkAndFormatMessage = function(message, callback){
  if(!message.content){
    var fault = "Message content undefined or null";

    console.log(new Date() + ': ' + fault);
    callback(fault, null);

  } else if (message.content.length > config.MESSAGE_SIZE_LIMIT){
    var fault = "Message size too long: " + message.content.length + ", need less than " + config.MESSAGE_SIZE_LIMIT;

    console.log(new Date() + ': ' + fault);
    callback(fault, null)
  }else if(message.username && message.username.length > config.USERNAME_SIZE_LIMIT){
    var fault = "Username size too long: " + username.content.length + ", need less than " + config.USERNAME_SIZE_LIMIT;

    console.log(new Date() + ': ' + fault);
    callback(fault, null);

  }else{
    if(message.username){
      // Capitalize username
      message.username =  message.username.substring(0,1).toUpperCase() + 
                          message.username.substring(1);
    } else {
      message.username = config.DEFAULT_USERNAME;
    }

    // html in message.content encoding THEN BBcode to html
    message.content = parser.parseString(message.content);

    // Smileys
    message.content = message.content.replace(/&lt;(img src="[a-f0-9]{32}.gif" alt="[a-z]+" \/)&gt;/g, '<$1>');

    // content is encoded, except for the created html, we encode it again
    
    message.username = entities.encode(message.username);
    message.content = entities.encode(message.content);

    // Set id
    message.message_id = message_id;
    message_id ++;

    console.log(new Date() + ': message_id ' + message.message_id + ' have been assigned to message from socket ' + message.socket_id);
    callback(null, message);
  }
}