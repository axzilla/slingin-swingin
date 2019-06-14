const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  refPost: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  votes: {
    downvotes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ],
    upvotes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Comment = mongoose.model('comment', CommentSchema)
