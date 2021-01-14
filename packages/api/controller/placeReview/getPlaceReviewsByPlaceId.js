// Models
const PlaceReview = require('../../models/PlaceReview')

// Utils

async function getPlaceReviewsByPlaceId(req, res) {
  try {
    const { placeId } = req.params
    const placeReviews = await PlaceReview.find({ place: placeId }).populate({
      path: 'user',
      populate: { path: 'profile' }
    })

    res.json(placeReviews)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceReviewsByPlaceId
