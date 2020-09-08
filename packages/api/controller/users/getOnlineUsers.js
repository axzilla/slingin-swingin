const User = require('../../models/User')

async function getOnlineUsers(req, res) {
  try {
    const users = await User.find({ isOnline: true, isActive: true })
      .select('-password')
      .populate('profile')
      .sort({ dateCreated: -1 })

    res.json(users)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getOnlineUsers
