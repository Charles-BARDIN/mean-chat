var Message = require('./db').Message;
var messageCache = require('./../caches/message');

module.exports.getLastMessageID = function(callback){
  Message.find(function(err,results){
    if(err){
      console.log(err);
      callback(err);

    } else {
      if(results.length){
        callback(null, Number(results[0].message_id) + 1)
      } else {
        callback(null, 0);
      }
    }
  })
  .sort({$natural: -1})
  .limit(1);
}

module.exports.addMessage = function(message, callback){
  messageCache.checkAndFormatMessage(message, function(err, result){
    var dbMess = new Message(result);
    if(!err){
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
    } else {
      callback(err, null);
    }
  })
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