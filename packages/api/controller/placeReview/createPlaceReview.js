// Models
const Place = require('../../models/Place')
const PlaceReview = require('../../models/PlaceReview')
const User = require('../../models/User')

async function createPlaceReview(req, res) {
  try {
    const { user } = req
    const { placeId } = req.body
    const data = { ...req.body, place: placeId, user: user._id }

    let createdPlaceReview = await PlaceReview.create(data)
    createdPlaceReview = await PlaceReview.findById(createdPlaceReview._id).populate({
      path: 'user',
      populate: { path: 'profile' }
    })

    const placeReviewId = createdPlaceReview._id
    await User.findByIdAndUpdate(req.user._id, { $push: { placeReviews: placeReviewId } })
    await Place.findByIdAndUpdate(placeId, { $push: { placeReviews: placeReviewId } })

    res.json(createdPlaceReview)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = createPlaceReview
