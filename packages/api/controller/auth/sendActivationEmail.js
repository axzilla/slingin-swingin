const crypto = require('crypto')

const User = require('../../models/User')
const mtuAuthRegister = require('../../nodemailer/templates/mtuAuthRegister')

async function sendActivationEmail(req, res) {
  try {
    const { login } = req.body

    const user = await User.findOne({ $or: [{ email: login }, { username: login }] })

    if (user) {
      const isActiveToken = crypto.randomBytes(16).toString('hex')

      user.isActiveToken = isActiveToken
      user.isActiveTokenExpires = Date.now() + 24 * 3600 * 1000
      await user.save()
      mtuAuthRegister(user, isActiveToken)
      res.json({ alertMessage: 'Email sent successfully' })
    }

    res.json({ alertMessage: 'User not found' })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = sendActivationEmail
