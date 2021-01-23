const createJwtToken = require('../../utils/createJwtToken')
const isEmpty = require('../../utils/isEmpty')
const User = require('../../models/User')
const sendPasswordForgot = require('../../nodemailer/templates/sendPasswordForgot')
const validatePasswordForgot = require('../../validation/validatePasswordForgot')

const transporter = require('../../nodemailer/transporter')

async function passwordForgot(req, res) {
  try {
    const { email } = req.body
    const { errors } = validatePasswordForgot(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      errors.email = 'E-Mail not found'
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
    sendPasswordForgot(transporter, foundUser, token)
    res.json({ alert: 'Email successfully sent' })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = passwordForgot
