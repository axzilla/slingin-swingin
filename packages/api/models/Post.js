const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  shortId: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  urlSlug: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  titleImage: {
    type: {}
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  bookmarks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

module.exports = Post = mongoose.model('post', PostSchema)
