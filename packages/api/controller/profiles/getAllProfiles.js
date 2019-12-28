const Profile = require('../../models/Profile')

async function getAllProfiles(req, res) {
  try {
    const foundProfiles = await Profile.find()
      .populate('user', ['name', 'username', 'avatar', 'isVerified'])
      .sort({ dateCreated: -1 })

    res.json(foundProfiles)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getAllProfiles
