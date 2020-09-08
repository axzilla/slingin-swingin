const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  handle: { type: String, required: true, max: 40, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  location: { type: String },
  status: { type: String },
  bio: { type: String },
  website: { type: String },
  youtube: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
  soundcloud: { type: String },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date }
})

module.exports = mongoose.model('profile', ProfileSchema)
