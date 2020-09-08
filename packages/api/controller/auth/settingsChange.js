const createJwtToken = require('../../utils/createJwtToken')
const User = require('../../models/User')

async function settingsChange(req, res) {
  try {
    const notifications = req.body

    const foundUser = await User.findById(req.user._id)

    foundUser.notifications = notifications
    const savedUser = await foundUser.save()

    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      avatar: savedUser.avatar,
      isVerified: savedUser.isVerified,
      notifications: savedUser.notifications,
      roles: savedUser.roles
    }

    const token = await createJwtToken(payload)
    res.json({ alert: 'Email changed successfully', success: true, token })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = settingsChange
