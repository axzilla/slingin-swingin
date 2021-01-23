const domains = require('disposable-email-domains')
const crypto = require('crypto')
// const sgMail = require('@sendgrid/mail')

const slugify = require('../../utils/slugify')
const hashPassword = require('../../utils/hashPassword')
const isEmpty = require('../../utils/isEmpty')

const validateRegister = require('../../validation/validateRegister')

const User = require('../../models/User')

const sendRegister = require('../../nodemailer/templates/sendRegister')

const transporter = require('../../nodemailer/transporter')

async function register(req, res) {
  try {
    const { errors } = validateRegister(req.body)
    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }
    const foundEmail = await User.findOne({ email: req.body.email })
    const foundUsername = await User.findOne({ username: req.body.username })
    if (foundEmail) {
      errors.email = 'There is already a user with this email address'
      return res.status(400).json(errors)
    }
    if (foundUsername) {
      errors.username = 'This username is already taken'
      return res.status(400).json(errors)
    }
    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'This email address is not allowed'
      return res.status(400).json(errors)
    }
    const isActiveToken = crypto.randomBytes(16).toString('hex')
    const newUser = await User.create({
      username: slugify(req.body.username),
      email: req.body.email,
      password: await hashPassword(req.body.password),
      isActiveToken,
      isActiveTokenExpires: Date.now() + 24 * 3600 * 1000
    })
    //
    // sgMail.setApiKey('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')
    // const msg = {
    //   to: 'axel.adrian@me.com', // Change to your recipient
    //   from: 'mail@noize.dev', // Change to your verified sender
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    // }
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent')
    //   })
    //   .catch(error => {
    //     console.error(error.response.body)
    //   })
    //
    sendRegister(transporter, newUser, isActiveToken)
    res.json({
      alertMessage:
        'You have successfully registered. Please check your email inbox to activate your account.'
    })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = register
