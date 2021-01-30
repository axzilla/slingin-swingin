const createJwtToken = require('../../utils/createJwtToken')
const cloudinary = require('../../utils/cloudinary')
const User = require('../../models/User')

async function avatarDelete(req, res) {
  try {
    const foundUser = await User.findById(req.user._id)
    foundUser.avatar = {}
    const savedUser = await foundUser.save()
    await cloudinary.v2.uploader.destroy(req.user.avatar.public_id)

    const payload = {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      avatar: savedUser.avatar,
      isVerified: savedUser.isVerified,
      notifications: savedUser.notifications,
      roles: savedUser.roles,
      isOnline: savedUser.isOnline
    }

    const token = await createJwtToken(payload)
    res.json({ success: true, token })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = avatarDelete
