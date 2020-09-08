// Utils
const slugify = require('../../utils/slugify')
const hashPassword = require('../../utils/hashPassword')

// Models
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// Nodemailer
const mtaAuthRegister = require('../../nodemailer/templates/mtaAuthRegister')

async function generateUser(req, res) {
  try {
    const foundUsername = await User.findOne({ username: req.body.username })

    if (foundUsername) {
      return res.status(400).json('This username is already taken')
    }

    const newUser = await User.create({
      username: slugify(req.body.username),
      email: `${slugify(req.body.username)}@noize.dev`,
      password: await hashPassword('123456'),
      isActive: true
    })

    mtaAuthRegister(newUser)

    const createdProfile = await Profile.create({
      user: newUser.id,
      handle: newUser.username
    })

    await User.findByIdAndUpdate(newUser.id, {
      profile: createdProfile._id
    })

    res.json({ message: 'Uers successfully generated' })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = generateUser
