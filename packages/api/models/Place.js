const mongoose = require('mongoose')
const shortId = require('shortid')

const Schema = mongoose.Schema

const PlaceSchema = new Schema({
  shortId: { type: String, default: shortId.generate, unique: true },
  urlSlug: { type: String, required: true },
  // required
  mapBox: { type: Object, required: true },
  longitude: { type: Object, required: true },
  latitude: { type: Object, required: true },
  name: { type: Object, required: true },
  continent: { type: String, required: true },
  continentCode: { type: String, required: true },
  country: { type: String, required: true },
  countryCode: { type: String, required: true },
  //
  region: { type: String, default: null },
  postcode: { type: String, default: null },
  district: { type: String, default: null },
  place: { type: String, default: null },
  locality: { type: String, default: null },
  neighborhood: { type: String, default: null },
  address: { type: String, default: null },
  poi: { type: String, default: null },
  //
  photo: { type: Object, required: true },
  //
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Place', PlaceSchema)
