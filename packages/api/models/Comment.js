const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  shortId: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  refPostId: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  refPostShortId: {
    type: String,
    required: true
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
  subComments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      subComment: {
        type: Schema.Types.ObjectId,
        ref: 'subComments'
      }
    }
  ],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date
  }
})

module.exports = Comment = mongoose.model('comment', CommentSchema)
