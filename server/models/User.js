const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  roles: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: Object
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  conditionsAccepted: {
    type: Boolean,
    default: false
  },
  notifications: {
    onNewPost: {
      type: Boolean,
      default: true
    },
    onOwnPost: {
      type: Boolean,
      default: true
    },
    onBookmarkedPost: {
      type: Boolean,
      default: true
    },
    onCommentedPost: {
      type: Boolean,
      default: true
    }
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', UserSchema)
