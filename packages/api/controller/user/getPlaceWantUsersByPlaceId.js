const User = require('../../models/User')

async function getPlaceCurrentUsersByPlaceId(req, res) {
  try {
    const { placeId } = req.params
    const users = await User.find({ isActive: true, locationWant: { $in: placeId } }).select(
      '-password'
    )
    res.json(users)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceCurrentUsersByPlaceId
