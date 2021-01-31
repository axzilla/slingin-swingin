// Models
const PlaceReview = require('../../models/PlaceReview')

async function getPlaceReviewsByPlaceId(req, res) {
  try {
    const { placeId } = req.params
    const placeReviews = await PlaceReview.find({ place: placeId }).populate('user')
    res.json(placeReviews)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceReviewsByPlaceId
