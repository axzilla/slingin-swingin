const domains = require('disposable-email-domains')
const slugify = require('../../utils/slugify')
const hashPassword = require('../../utils/hashPassword')
const isEmpty = require('../../utils/isEmpty')
const createJwtToken = require('../../utils/createJwtToken')
const validateRegister = require('../../validation/validateRegister')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const mtuAuthRegister = require('../../nodemailer/templates/mtuAuthRegister')
const mtaAuthRegister = require('../../nodemailer/templates/mtaAuthRegister')

async function register(req, res) {
  try {
    const { errors } = validateRegister(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundEmail = await User.findOne({ email: req.body.email })
    const foundUsername = await User.findOne({ username: req.body.username })

    if (foundEmail) {
      errors.email = 'Es gibt bereits einen Benutzer mit dieser E-Mail Adresse'
      return res.status(400).json(errors)
    }

    if (foundUsername) {
      errors.username = 'Dieser Benutzername ist bereits vergeben'
      return res.status(400).json(errors)
    }

    if (domains.includes(req.body.email.split('@')[1])) {
      errors.email = 'Diese E-Mail Adresse ist nicht erlaubt'
      return res.status(400).json(errors)
    }

    const newUser = await User.create({
      username: slugify(req.body.username),
      email: req.body.email,
      password: await hashPassword(req.body.password),
      conditionsAccepted: req.body.conditionsAccepted
    })

    const payload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
      isVerified: newUser.isVerified,
      notifications: newUser.notifications,
      roles: newUser.roles
    }

    mtuAuthRegister(newUser)
    mtaAuthRegister(newUser)

    new Profile({ user: newUser.id, handle: newUser.username }).save()

    const token = await createJwtToken(payload)
    res.json({ success: true, token })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = register
