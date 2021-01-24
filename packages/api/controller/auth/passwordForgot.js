// Packages
const isEmpty = require('../../utils/isEmpty')
const crypto = require('crypto')

// Models
const User = require('../../models/User')

// Nodemailer
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

    const user = await User.findOne({ email })

    if (!user) {
      errors.email = 'E-Mail not found'
      return res.status(404).json(errors)
    }

    const resetPasswordToken = crypto.randomBytes(16).toString('hex')

    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordTokenExpires = Date.now() + 24 * 3600 * 1000
    await user.save()

    sendPasswordForgot(transporter, user, resetPasswordToken)
    res.json({ alert: 'Email successfully sent' })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = passwordForgot
