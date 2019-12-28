const createJwtToken = require('../../utils/createJwtToken')
const User = require('../../models/User')

async function verify(req, res) {
  try {
    const errors = {}

    const foundUser = await User.findOne({ _id: req.body.id })

    if (!foundUser) {
      errors.user = 'Benutzer nicht gefunden'
      return res.status(404).json(errors)
    }

    if (foundUser && !foundUser.isVerified) {
      const currentTime = Date.now() / 1000

      if (req.body.exp < currentTime) {
        errors.tokenExpired = 'Verifizierungstoken ist abgelaufen'
        return res.status(404).json(errors)
      }

      foundUser.isVerified = true
      foundUser.save()

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
      res.json({ success: true, token })
    } else {
      errors.alreadyVerified = 'Benutzer ist bereits verifiziert'
      return res.status(404).json(errors)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = verify
