const createJwtToken = require('../../utils/createJwtToken')
const User = require('../../models/User')
const domains = require('disposable-email-domains')
const sendEmailChange = require('../../nodemailer/templates/sendEmailChange')
const validateEmailChange = require('../../validation/validateEmailChange')
const isEmpty = require('../../utils/isEmpty')

const transporter = require('../../nodemailer/transporter')

async function emailChange(req, res) {
  try {
    const { errors } = validateEmailChange(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUserByEmail = await User.findOne({ email: req.body.email })
    const foundUserById = await User.findById(req.body.id)

    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'This email address is not allowed'
      return res.status(400).json(errors)
    }

    if (foundUserByEmail) {
      errors.email = 'This email address is already in use'
      return res.status(400).json(errors)
    }

    const newEmail = req.body.email
    const oldEmail = foundUserById.email
    foundUserById.email = newEmail

    const savedUser = await foundUserById.save()

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

    sendEmailChange(transporter, savedUser, oldEmail)
    const token = await createJwtToken(payload)
    res.json({ alert: 'Email changed successfully', success: true, token })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = emailChange
