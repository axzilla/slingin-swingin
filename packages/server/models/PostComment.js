const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostCommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'post' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  content: { type: String, required: true },
  votes: {
    downvotes: [{ user: { type: Schema.Types.ObjectId, ref: 'user' } }],
    upvotes: [{ user: { type: Schema.Types.ObjectId, ref: 'user' } }]
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date }
})

module.exports = mongoose.model('postComment', PostCommentSchema)
