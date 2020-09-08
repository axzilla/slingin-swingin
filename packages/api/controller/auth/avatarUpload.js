const cloudinary = require('../../utils/cloudinary')
const User = require('../../models/User')
const createJwtToken = require('../../utils/createJwtToken')

async function avatarUpload(req, res) {
  try {
    const { mimetype, buffer } = req.file
    const file = `data:${mimetype};base64,${buffer.toString('base64')}`

    const uploadedFile = await cloudinary.v2.uploader.upload(file, {
      folder: process.env.CLOUDINARY_PATH_USER_AVATAR,
      public_id: `avatar-${req.user._id}`
    })

    console.log('User avatar on cloudinary successful uploaded!') // eslint-disable-line no-console
    const foundUser = await User.findById(req.user._id)

    foundUser.avatar = uploadedFile
    const savedUser = await foundUser.save()

    const payload = {
      id: savedUser.id,
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

module.exports = avatarUpload
