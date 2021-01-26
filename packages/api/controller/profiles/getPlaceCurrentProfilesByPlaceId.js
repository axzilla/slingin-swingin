const Profile = require('../../models/Profile')

async function getPlaceCurrentProfilesByPlaceId(req, res) {
  try {
    const { placeId } = req.params
    const profiles = await Profile.find({ locationCurrent: placeId }).populate('user', '-password')
    const activeProfiles = await profiles.filter(profile => profile.user.isActive)

    res.json(activeProfiles)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceCurrentProfilesByPlaceId
