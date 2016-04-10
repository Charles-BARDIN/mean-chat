var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/message');

var Message = mongoose.model('Message', new mongoose.Schema({
  message_id: { type: Number, required: true, index: true, unique: true},
  time: {type: Date, default: Date.now},
  username: String,
  content: String
}))

module.exports.Message = Message;