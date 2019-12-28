const Profile = require('../../models/Profile')

async function getProfileByHandle(req, res) {
  try {
    const foundProfile = await Profile.findOne({ handle: req.params.handle }).populate('user', [
      'name',
      'username',
      'avatar',
      'isVerified'
    ])

    res.json(foundProfile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getProfileByHandle
