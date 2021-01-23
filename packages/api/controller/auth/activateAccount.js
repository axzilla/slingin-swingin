// Models
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// Nodemailer
const sendWelcome = require('../../nodemailer/templates/sendWelcome')
const transporter = require('../../nodemailer/transporter')

// Utils
const createJwtToken = require('../../utils/createJwtToken')

async function activateAccount(req, res) {
  try {
    const { token } = req.body

    const user = await User.findOne({
      isActiveToken: token,
      isActiveTokenExpires: { $gt: Date.now() }
    })

    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isVerified: user.isVerified,
        notifications: user.notifications,
        roles: user.roles,
        isActive: user.isActive,
        isOnline: user.isOnline
      }

      const jwtToken = await createJwtToken(payload)

      if (user.isActive) {
        res.json({ alertMessage: 'The email address has already been confirmed.', jwtToken })
      } else {
        user.isActive = true
        user.save()

        const profile = await Profile.findOne({ user: user.id })

        if (!profile) {
          const createdProfile = await Profile.create({ user: user.id, handle: user.username })
          await User.findByIdAndUpdate(user.id, { profile: createdProfile._id })
        }

        sendWelcome(transporter, user)

        res.json({ alertMessage: 'Thank you for confirming your email address!', jwtToken })
      }
    } else {
      res.json({ alertMessage: 'Your confirmation link is invalid, please request a new one.' })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = activateAccount
