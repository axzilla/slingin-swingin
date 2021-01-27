// Models
const User = require('../../models/User')

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
        res.json({ message: 'Email address already confirmed.', variant: 'success', jwtToken })
      } else {
        user.isActive = true
        user.save()

        sendWelcome(transporter, user)

        res.json({
          message: 'Thank you for confirming your email address!',
          variant: 'success',
          jwtToken
        })
      }
    } else {
      res.json({
        message: 'Your confirmation link is invalid, please request a new one.',
        variant: 'error'
      })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = activateAccount
