const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostCommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  parent: { type: Schema.Types.ObjectId, ref: 'PostComment' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  contentRaw: { type: String, required: true },
  contentText: { type: String, required: true },
  hashtags: { type: Array },
  votes: {
    downvotes: [{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],
    upvotes: [{ user: { type: Schema.Types.ObjectId, ref: 'user' } }]
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date }
})

module.exports = mongoose.model('PostComment', PostCommentSchema)
