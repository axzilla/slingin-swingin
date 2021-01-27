const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Conversation', ConversationSchema)
