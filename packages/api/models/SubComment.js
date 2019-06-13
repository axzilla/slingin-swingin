const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubCommentSchema = new Schema({
  refPost: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  refComment: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date
  }
})

module.exports = SubComment = mongoose.model('subcomment', SubCommentSchema)
