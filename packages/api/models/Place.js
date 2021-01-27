const mongoose = require('mongoose')
const shortId = require('shortid')

const Schema = mongoose.Schema

const PlaceSchema = new Schema({
  shortId: { type: String, default: shortId.generate, unique: true },
  urlSlug: { type: String },
  mapBox: { type: Object },
  photo: { type: Object },
  placeReviews: [{ type: Schema.Types.ObjectId, ref: 'PlaceReview' }],
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Place', PlaceSchema)
