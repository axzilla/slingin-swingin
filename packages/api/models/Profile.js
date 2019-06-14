const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  color: {
    type: Object
  },
  Avatar: {
    type: String
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  github: {
    type: String
  },
  gitlab: {
    type: String
  },
  bitbucket: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    xing: {
      type: String
    },
    pinterest: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
