// Utils
const createJwtToken = require('../../utils/createJwtToken')
const hashPassword = require('../../utils/hashPassword')

// Validation
const validatePasswordReset = require('../../validation/validatePasswordReset')

// Models
const User = require('../../models/User')

// Nodemailer
const sendPasswordReset = require('../../nodemailer/templates/sendPasswordReset')
const transporter = require('../../nodemailer/transporter')

// Validation
const isEmpty = require('../../utils/isEmpty')

async function passwordReset(req, res) {
  try {
    const { password, resetPasswordToken } = req.body
    const { errors } = validatePasswordReset(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpires: { $gt: Date.now() }
    })

    if (!user) {
      res.json('Your request to reset password has already expired. Please try again.')
    }

    user.password = await hashPassword(password)
    user.save()

    const payload = {
      _id: user._id,
      isActive: user.isActive,
      email: user.email,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      isVerified: user.isVerified,
      notifications: user.notifications,
      roles: user.roles,
      isOnline: user.isOnline
    }

    sendPasswordReset(transporter, user)
    const token = await createJwtToken(payload)
    res.json(token)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = passwordReset
