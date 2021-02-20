const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MediaFileSchema = new Schema({
  cloudinary: { type: Object, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  postComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('MediaFile', MediaFileSchema)
