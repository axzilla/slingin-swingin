const Profile = require('../../models/Profile')

async function getPlaceCurrentProfilesByPlaceId(req, res) {
  try {
    const { placeId } = req.params
    const profiles = await Profile.find({ locationBeen: { $in: placeId } }).populate('user')
    res.json(profiles)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceCurrentProfilesByPlaceId
