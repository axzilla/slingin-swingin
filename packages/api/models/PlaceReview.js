const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlaceReviewSchema = new Schema({
  text: { type: String },
  //
  ratings: {
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
    familyFriendly: { type: Number, default: 0 }
  },
  //
  costs: {
    food: {
      coffee: { type: Number, default: 0 },
      cappuccino: { type: Number, default: 0 },
      tea: { type: Number, default: 0 },
      beer: { type: Number, default: 0 },
      cocktail: { type: Number, default: 0 },
      lemonade: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
      localFood: { type: Number, default: 0 },
      restaurant: { type: Number, default: 0 }
    },
    monthly: {
      hotel: { type: Number, default: 0 },
      airbnb: { type: Number, default: 0 },
      apartment: { type: Number, default: 0 },
      house: { type: Number, default: 0 },
      villa: { type: Number, default: 0 },
      coworking: { type: Number, default: 0 },
      scooter: { type: Number, default: 0 }
    }
  },
  //
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  place: { type: Schema.Types.ObjectId, ref: 'place', required: true },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('placereview', PlaceReviewSchema)
