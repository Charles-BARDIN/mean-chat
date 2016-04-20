var Entities = require('html-entities').AllHtmlEntities;
var writelog = require('./../writelog').writelog;
var TYPE = 'MESSAGE CACHE'
var util = require('util');

var config = require('./../constants');
var db = require('./../db/crud');
var socketIo = require('./../socket/socket');

var entities = new Entities();
var parser = require('./../bbcode/bbcode');

var messageCollection = [];

var addMessage = function(message, callback){
  message.username = entities.decode(message.username),
  message.content = entities.decode(message.content),

  messageCollection.unshift(message);

  if(messageCollection.length > config.CACHE_LIMIT){
    messageCollection.pop();
  }
  writelog('Message added to cache: ' + JSON.stringify(message), TYPE);

  if(callback && typeof(callback) == "function"){
    callback(null, message);
  }
};

// Exports
module.exports.addMessage = addMessage;

module.exports.getMessageCollection = function(){
  return messageCollection;
};

module.exports.loadFromDB = function(callback){
  db.findAllMessages(config.CACHE_LIMIT, function(err, results){
    if(results){
      for(var i = 0; i < results.length; i++){
        addMessage(results[results.length - (i + 1)]);
      }

      writelog((results.length || 0) + ' message' + (results.length > 1 ? 's' : '') + ' recovered from database', TYPE);

      if(callback && typeof(callback) == "function"){
        callback();
      }
    }
  });
};

module.exports.checkAndFormatMessage = function(message, callback){
  if(!message.content){
    var fault = "Message content undefined or null";

    writelog(fault, TYPE + ' ERROR');
    if(callback && typeof(callback) == "function")
      callback(fault, null);

  } else if (message.content.length > config.MESSAGE_SIZE_LIMIT){
    var fault = "Message " + message._id + " too long: " + message.content.length + ", need less than " + config.MESSAGE_SIZE_LIMIT;

    writelog(fault, TYPE + ' ERROR');
    if(callback && typeof(callback) == "function")
      callback(fault, null)
  }else if(message.username && message.username.length > config.USERNAME_SIZE_LIMIT){
    var fault = "Username from message " + message._id + " too long: " + username.content.length + ", need less than " + config.USERNAME_SIZE_LIMIT;

    writelog(fault, TYPE + ' ERROR');
    if(callback && typeof(callback) == "function")
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

    if(callback && typeof(callback) == "function")
      callback(null, message);
  }
}