const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  handle: { type: String, required: true, max: 40, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  avatar: { type: String },
  locationFrom: { type: Schema.Types.ObjectId, ref: 'place' },
  locationCurrent: { type: Schema.Types.ObjectId, ref: 'place' },
  bio: { type: String },
  website: { type: String },
  youtube: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('profile', ProfileSchema)
