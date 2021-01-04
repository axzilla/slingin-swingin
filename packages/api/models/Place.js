const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlaceSchema = new Schema({
  mapBox: { type: Object },
  google: { type: Object },
  photo: { type: Object }
})

module.exports = mongoose.model('place', PlaceSchema)
