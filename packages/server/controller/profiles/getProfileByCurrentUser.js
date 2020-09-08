const Profile = require('../../models/Profile')

async function getProfileByCurrentUser(req, res) {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id }).populate('user', '-password')

    if (!foundProfile) {
      return res.status(404).json('404')
    }

    res.json(foundProfile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getProfileByCurrentUser
