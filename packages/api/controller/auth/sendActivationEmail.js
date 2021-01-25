// Packages
const crypto = require('crypto')

// Models
const User = require('../../models/User')

// Nodemailer
const sendConfirmation = require('../../nodemailer/templates/sendConfirmation')
const transporter = require('../../nodemailer/transporter')

async function sendActivationEmail(req, res) {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    const isActiveToken = crypto.randomBytes(16).toString('hex')

    user.isActiveToken = isActiveToken
    user.isActiveTokenExpires = Date.now() + 24 * 3600 * 1000
    await user.save()

    sendConfirmation(transporter, user, isActiveToken)
    res.json({ message: ` A confirmation email has been sent to ${email}.`, variant: 'success' })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = sendActivationEmail
