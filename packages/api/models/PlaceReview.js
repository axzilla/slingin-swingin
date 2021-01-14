const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlaceReviewSchema = new Schema({
  summary: { type: String },
  //
  airQuality: { type: Number, default: 0 },
  internet: { type: Number, default: 0 },
  veganFriendly: { type: Number, default: 0 },
  vegeterianFriendly: { type: Number, default: 0 },
  femaleFriendly: { type: Number, default: 0 },
  coworking: { type: Number, default: 0 },
  coliving: { type: Number, default: 0 },
  healthcare: { type: Number, default: 0 },
  nightlife: { type: Number, default: 0 },
  peace: { type: Number, default: 0 },
  fun: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  safety: { type: Number, default: 0 },
  walkability: { type: Number, default: 0 },
  trafficSafety: { type: Number, default: 0 },
  people: { type: Number, default: 0 },
  familyFriendly: { type: Number, default: 0 },
  //
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  place: { type: Schema.Types.ObjectId, ref: 'place', required: true },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('placereview', PlaceReviewSchema)
