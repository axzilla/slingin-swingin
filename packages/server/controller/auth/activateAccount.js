const User = require('../../models/User')
const Profile = require('../../models/Profile')

async function activateAccount(req, res) {
  try {
    const { token } = req.body

    const user = await User.findOne({
      isActiveToken: token,
      isActiveTokenExpires: { $gt: Date.now() }
    })

    if (!user) {
      res.json({ alertMessage: 'Your activation link is invalid, please request a new one.' })
    } else if (user.isActive) {
      res.json({ alertMessage: 'This account is already activated.' })
    } else {
      user.isActive = true
      user.save()

      const profile = await Profile.findOne({ user: user.id })

      if (!profile) {
        const createdProfile = await Profile.create({ user: user.id, handle: user.username })
        await User.findByIdAndUpdate(user.id, { profile: createdProfile._id })
      }

      res.json({ alertMessage: 'Account activated successfully' })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = activateAccount
