const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const PlaceSchema = new Schema({
  shortId: { type: String, default: shortid.generate, unique: true },
  urlSlug: { type: String },
  mapBox: { type: Object },
  photo: { type: Object },
  placeReviews: [{ type: Schema.Types.ObjectId, ref: 'placereview' }],
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('place', PlaceSchema)
