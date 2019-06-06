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
  subComments: [{ type: Schema.Types.ObjectId, ref: 'subComments' }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date
  }
})

module.exports = Comment = mongoose.model('comment', CommentSchema)
