const Profile = require('../../models/Profile')

async function getProfileByCurrentUser(req, res) {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', '-password')
      .populate('locationFrom')
      .populate('locationCurrent')

    if (!profile) {
      return res.status(404).json('404')
    }

    res.json(profile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getProfileByCurrentUser
