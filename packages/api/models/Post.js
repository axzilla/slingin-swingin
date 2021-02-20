const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  gif: { type: Object },
  contentRaw: { type: String },
  contentText: { type: String },
  mediaFiles: [{ type: Schema.Types.ObjectId, ref: 'MediaFile' }],
  place: { type: Schema.Types.ObjectId, ref: 'Place' },
  hashtags: { type: Array },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  postComments: [{ type: Schema.Types.ObjectId, ref: 'PostComment' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date }
})

module.exports = mongoose.model('Post', PostSchema)
