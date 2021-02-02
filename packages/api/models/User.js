const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortId = require('shortid')

const UserSchema = new Schema({
  shortId: { type: String, default: shortId.generate, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  //
  avatar: { type: Object },
  name: { type: String, required: true },
  locationFrom: { type: Schema.Types.ObjectId, ref: 'Place' },
  locationCurrent: { type: Schema.Types.ObjectId, ref: 'Place' },
  bio: { type: String },
  website: { type: String },
  youtube: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
  //
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  postComments: [{ type: Schema.Types.ObjectId, ref: 'PostComment' }],
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  placeReviews: [{ type: Schema.Types.ObjectId, ref: 'PlaceReview' }],
  //
  notifications: {
    onNewPost: { type: Boolean, default: true },
    onOwnPost: { type: Boolean, default: true },
    onBookmarkedPost: { type: Boolean, default: true },
    onCommentedPost: { type: Boolean, default: true }
  },
  //
  isActive: { type: Boolean, default: false },
  isActiveToken: { type: String },
  isActiveTokenExpires: { type: Date },
  //
  resetPasswordToken: { type: String },
  resetPasswordTokenExpires: { type: Date },
  //
  dateCreated: { type: Date, default: Date.now },
  dateActivated: { type: Date }
  // dateOnline: { type: Date },
  // dateOffline: { type: Date },
  // isOnline: { type: Boolean },
  // sockets: [{ type: String }]
})

module.exports = mongoose.model('User', UserSchema)
