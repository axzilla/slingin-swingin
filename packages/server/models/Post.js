const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  shortId: { type: String, default: shortid.generate, unique: true },
  isPinned: { type: Boolean, default: false },
  urlSlug: { type: String },
  views: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  titleImage: { type: Object },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: Array },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  postComments: [{ type: Schema.Types.ObjectId, ref: 'postComment' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date }
})

module.exports = mongoose.model('post', PostSchema)
