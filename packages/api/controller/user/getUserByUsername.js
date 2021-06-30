const User = require('../../models/User')

async function getUserByUsername(req, res) {
  try {
    const { username } = req.params

    const user = await User.findOne({ isActive: true, username }).select('-password')

    if (!user) {
      return res.status(404).json('404')
    }

    res.json(user)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getUserByUsername
