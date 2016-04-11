var config = require('./../constants');
var Message = require('./db').Message;
var socketIo = require('./../socket/socket');
var messageCache = require('./../caches/message');
var Entities = require('html-entities').AllHtmlEntities;

var entities = new Entities();
var parser = require('./../bbcode/bbcode');

var MESSAGE_SIZE_LIMIT = config.MESSAGE_SIZE_LIMIT;
var USERNAME_SIZE_LIMIT = config.USERNAME_SIZE_LIMIT;

var message_id = Message.find(function(err,results){
  if(err){
    console.log("Error while getting last id: " + err);

  } else {
    message_id = Number(results[0].message_id) + 1;
  }
})
.sort({$natural: -1})
.limit(1);

module.exports.addMessage = function(message, callback){

  if(message.content.length > MESSAGE_SIZE_LIMIT){
    var fault = "Message size too long: " + message.content.length + ", need less than " + MESSAGE_SIZE_LIMIT;

    console.log(fault);
    callback(fault, null);

  }else if(message.username.length > USERNAME_SIZE_LIMIT){
    var fault = "Username size too long: " + username.content.length + ", need less than " + USERNAME_SIZE_LIMIT;

    console.log(fault);
    callback(fault, null);

  }else{
    // Capitalize username
    message.username =  message.username.substring(0,1).toUpperCase() + 
                        message.username.substring(1);

    message.content = parser.parseString(message.content);

    // content is encoded, except for the created html, we encode it again
    
    message.username = entities.encode(message.username);
    message.content = entities.encode(message.content);

    // Set id
    message.message_id = message_id;
    message_id ++;

    var dbMess = new Message(message);
    dbMess.save(function(err){
      if(err) {
          console.log(err);

          var fault = "Error on saving data"
          callback(fault, null);

      } else {
        messageCache.addMessage(dbMess, function(err, result){
          if(!err){
            callback(null, result);     
          }
        });
      }
    });
  }
}

module.exports.findAllMessages = function(limit, callback){
  if(limit){
    Message.find(function(err, results) {
      if(err){
        console.log(err);
        callback(err, null);

      } else {
        callback(null, results)

      }
    })
    .sort({$natural: -1})
    .limit(limit);

  } else {
    Message.find(function(err, results) {
      if(err){
        console.log(err);
        callback(err, null);

      } else {
        callback(null, results)

      }
    })
    .sort({$natural: -1})
  }
}