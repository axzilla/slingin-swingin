const createJwtToken = require('../../utils/createJwtToken')
const isEmpty = require('../../utils/isEmpty')
const User = require('../../models/User')
const mtuAuthPasswordForgot = require('../../nodemailer/templates/mtuAuthPasswordForgot')
const validatePasswordForgot = require('../../validation/validatePasswordForgot')

async function passwordForgot(req, res) {
  try {
    const { errors } = validatePasswordForgot(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const { email } = req.body
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      errors.email = 'User not found'
      return res.status(404).json(errors)
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      avatar: foundUser.avatar,
      isVerified: foundUser.isVerified,
      notifications: foundUser.notifications,
      roles: foundUser.roles,
      isOnline: foundUser.isOnline
    }

    const token = await createJwtToken(payload)
    mtuAuthPasswordForgot(foundUser, token)
    res.json({ alert: 'Email successfully sent' })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = passwordForgot
