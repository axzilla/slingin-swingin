const Profile = require('../../models/Profile')

async function getProfileByHandle(req, res) {
  try {
    const profile = await Profile.findOne({ handle: req.params.handle })
      .populate('user', '-password')
      .populate('locationCurrent')
      .populate('locationFrom')

    if (!profile) {
      return res.status(404).json('404')
    }

    res.json(profile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getProfileByHandle
