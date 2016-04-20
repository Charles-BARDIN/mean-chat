var Message = require('./db').Message;
var messageCache = require('./../caches/message');
var writelog = require('./../writelog').writelog;
var TYPE = 'DATABASE';

module.exports.addMessage = function(message, callback){
  messageCache.checkAndFormatMessage(message, function(err, result){
    var dbMess = new Message(result);
    if(!err){
      dbMess.save(function(err){
        if(err) {
            writelog(err, TYPE + ' ERROR');

            var fault = "Error on saving data"
            if(callback && typeof(callback) == "function")
              callback(fault, null);

        } else {
          writelog("Message added to database: " + JSON.stringify(dbMess), TYPE);
          messageCache.addMessage(dbMess, function(err, result){
            if(!err){
              if(callback && typeof(callback) == "function")
                callback(null, result);     
            }
          });
        }
      });
    } else {
      if(callback && typeof(callback) == "function")
        callback(err, null);
    }
  })
}

module.exports.findAllMessages = function(limit, callback){
  if(limit){
    Message.find(function(err, results) {
      if(err){
        writelog(err, TYPE + ' ERROR');
        if(callback && typeof(callback) == "function")
          callback(err, null);

      } else {
        if(callback && typeof(callback) == "function")
          callback(null, results)

      }
    })
    .sort({$natural: -1})
    .limit(limit);

  } else {
    Message.find(function(err, results) {
      if(err){
        writelog(err, TYPE + ' ERROR');
        if(callback && typeof(callback) == "function")
          callback(err, null);

      } else {
        if(callback && typeof(callback) == "function")
          callback(null, results)

      }
    })
    .sort({$natural: -1})
  }
}