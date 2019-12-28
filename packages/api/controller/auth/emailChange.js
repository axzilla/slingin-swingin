const createJwtToken = require('../../utils/createJwtToken')
const User = require('../../models/User')
const domains = require('disposable-email-domains')
const mtuAuthEmailChange = require('../../nodemailer/templates/mtuAuthEmailChange')
const validateEmailChange = require('../../validation/validateEmailChange')
const isEmpty = require('../../utils/isEmpty')

async function emailChange(req, res) {
  try {
    const { errors } = validateEmailChange(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUserByEmail = await User.findOne({ email: req.body.email })
    const foundUserById = await User.findById(req.body.id)

    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'Diese E-Mail Adresse ist nicht erlaubt'
      return res.status(400).json(errors)
    }

    if (foundUserByEmail) {
      errors.email = 'E-Mail Adresse ist bereits vergeben'
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
      roles: savedUser.roles
    }

    mtuAuthEmailChange(savedUser, oldEmail)
    const token = await createJwtToken(payload)
    res.json({ alert: 'E-Mail erfolgreich geändert', success: true, token })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = emailChange
