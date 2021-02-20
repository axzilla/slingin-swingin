const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  contentRaw: { type: String },
  contentText: { type: String },
  hashtags: { type: Array },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isSeen: { type: Boolean, default: false },
  dateIsSeen: { type: Date },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', MessageSchema)
