const Profile = require('../../models/Profile')

async function getProfileByCurrentUser(req, res) {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    res.json(foundProfile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getProfileByCurrentUser
