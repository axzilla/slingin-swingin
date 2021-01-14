// Models
const PlaceReview = require('../../models/PlaceReview')

async function updatePlaceReview(req, res) {
  try {
    const { placeReviewId } = req.body

    const data = req.body
    const options = { new: true }

    const updatedPlaceReview = await PlaceReview.findByIdAndUpdate(
      placeReviewId,
      data,
      options
    ).populate({ path: 'user', populate: { path: 'profile' } })

    res.json(updatedPlaceReview)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = updatePlaceReview
