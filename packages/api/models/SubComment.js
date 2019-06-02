const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const SubCommentSchema = new Schema({
  commentRef: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
  shortId: {
    type: String,
    default: shortid.generate,
    unique: true
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
