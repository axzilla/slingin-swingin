const Profile = require('../../models/Profile')

async function getProfileByHandle(req, res) {
  try {
    const foundProfile = await Profile.findOne({ handle: req.params.handle }).populate(
      'user',
      '-password'
    )

    if (!foundProfile) {
      return res.status(404).json('404')
    }

    res.json(foundProfile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getProfileByHandle
