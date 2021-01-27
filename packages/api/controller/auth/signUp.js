// Packages
const domains = require('disposable-email-domains')
const crypto = require('crypto')

// Utils
const hashPassword = require('../../utils/hashPassword')
const isEmpty = require('../../utils/isEmpty')
const slugify = require('../../utils/slugify')

// Validation
const validateSignUp = require('../../validation/validateSignUp')

// Models
const User = require('../../models/User')

// Nodemailer
const sendConfirmation = require('../../nodemailer/templates/sendConfirmation')
const transporter = require('../../nodemailer/transporter')

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body
    const { errors } = validateSignUp(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundEmail = await User.findOne({ email: req.body.email })

    if (foundEmail) {
      errors.email = 'Email address is already in use'
      return res.status(400).json(errors)
    }

    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'This email address is not allowed'
      return res.status(400).json(errors)
    }

    const isActiveToken = crypto.randomBytes(16).toString('hex')

    const createdUser = await User.create({
      name,
      email,
      username: slugify(name) + Math.floor(Math.random() * (9999 - 1000) + 1000),
      password: await hashPassword(password),
      isActiveToken,
      isActiveTokenExpires: Date.now() + 24 * 3600 * 1000
    })

    sendConfirmation(transporter, createdUser, isActiveToken)

    res.json(createdUser)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = signUp
