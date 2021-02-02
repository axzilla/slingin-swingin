const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  shortId: { type: String, default: shortid.generate, unique: true },
  isPinned: { type: Boolean, default: false },
  urlSlug: { type: String },
  views: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  titleImage: { type: Object },
  title: { type: String, required: true },
  contentRaw: { type: String, required: true },
  contentHtml: { type: String, required: true },
  contentText: { type: String, required: true },
  contentMarkdown: { type: String, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Place' },
  tags: { type: Array },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  postComments: [{ type: Schema.Types.ObjectId, ref: 'PostComment' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date }
})

module.exports = mongoose.model('Post', PostSchema)
