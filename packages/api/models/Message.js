const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation' },
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  isSeen: { type: Boolean, default: false },
  dateIsSeen: { type: Date },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('message', MessageSchema)
