var Entities = require('html-entities').AllHtmlEntities;

var entities = new Entities();

var config = require('./../constants');
var db = require('./../db/crud');

var CACHE_LIMIT = config.CACHE_LIMIT;

var messageCollection = [];

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

module.exports.addMessage = addMessage;

module.exports.getMessageCollection = function(){
  return messageCollection;
};

module.exports.loadFromDB = function(callback){
  messFromDb = db.findAllMessages(CACHE_LIMIT, function(err, results){
    if(results){
      for(var i = 0; i < results.length; i++){
        addMessage(results[results.length - (i + 1)]);
      }
      
      if(callback){
        callback();
      }
    }
  });
};