const createJwtToken = require('../../utils/createJwtToken')
const User = require('../../models/User')
const mtuAuthVerification = require('../../nodemailer/templates/mtuAuthVerification')

async function verifyMail(req, res) {
  try {
    const errors = {}

    const foundUser = await User.findOne({ _id: req.body.id })

    if (!foundUser) {
      errors.foundUser = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }

    if (foundUser && foundUser.isVerified) {
      errors.alreadyVerified = 'Benutzer ist bereits verifiziert'
      return res.status(404).json(errors)
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      avatar: foundUser.avatar,
      isVerified: foundUser.isVerified,
      notifications: foundUser.notifications,
      roles: foundUser.roles
    }

    const token = await createJwtToken(payload)
    mtuAuthVerification(foundUser, token)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = verifyMail
