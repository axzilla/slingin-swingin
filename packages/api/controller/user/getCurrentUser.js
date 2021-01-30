const User = require('../../models/User')

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('locationFrom')
      .populate('locationCurrent')

    if (!user) {
      return res.status(404).json('404')
    }

    res.json(user)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getCurrentUser
