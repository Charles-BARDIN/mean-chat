var Entities = require('html-entities').AllHtmlEntities;

var config = require('./../constants');
var db = require('./../db/crud');
var socketIo = require('./../socket/socket');

var entities = new Entities();
var parser = require('./../bbcode/bbcode');

var CACHE_LIMIT = config.CACHE_LIMIT;
var MESSAGE_SIZE_LIMIT = config.MESSAGE_SIZE_LIMIT;
var USERNAME_SIZE_LIMIT = config.USERNAME_SIZE_LIMIT;

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

  if(messageCollection.length > CACHE_LIMIT){
    messageCollection.pop();
  }

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
  messFromDb = db.findAllMessages(CACHE_LIMIT, function(err, results){
    if(results){
      console.log('Messages recovered from database...')
      for(var i = 0; i < results.length; i++){
        addMessage(results[results.length - (i + 1)]);
      }
      
      db.getLastMessageID(function(err, result){
        if(!err){
          if(result){
            message_id = result;
          }
          console.log('Last message ID set...')

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

    console.log(fault);
    callback(fault, null);

  } else if (message.content.length > MESSAGE_SIZE_LIMIT){
    var fault = "Message size too long: " + message.content.length + ", need less than " + MESSAGE_SIZE_LIMIT;

    console.log(fault);
    callback(fault, null)
  }else if(message.username && message.username.length > USERNAME_SIZE_LIMIT){
    var fault = "Username size too long: " + username.content.length + ", need less than " + USERNAME_SIZE_LIMIT;

    console.log(fault);
    callback(fault, null);

  }else{
    if(message.username){
      // Capitalize username
      message.username =  message.username.substring(0,1).toUpperCase() + 
                          message.username.substring(1);
    } else {
      message.username = "Anonymous"
    }

    // html in message.content encoding THEN BBcode to html
    message.content = parser.parseString(message.content);

    // content is encoded, except for the created html, we encode it again
    
    message.username = entities.encode(message.username);
    message.content = entities.encode(message.content);

    // Set id
    message.message_id = message_id;
    message_id ++;
    callback(null, message);
  }
}