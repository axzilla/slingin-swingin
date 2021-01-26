// Packages
const bcrypt = require('bcryptjs')

// Utils
const createJwtToken = require('../../utils/createJwtToken')
const isEmpty = require('../../utils/isEmpty')

// Validation
const validateSignIn = require('../../validation/validateSignIn')

// Models
const User = require('../../models/User')

async function signIn(req, res) {
  try {
    const { email, password } = req.body

    const { errors } = validateSignIn(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findOne({ email: email.toLowerCase() })

    if (!foundUser) {
      errors.email = 'Email not found'
      return res.status(400).json(errors)
    }

    const isPasswordMatched = await bcrypt.compare(password, foundUser.password)

    if (!isPasswordMatched) {
      errors.password = 'Wrong password'
      return res.status(400).json(errors)
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      avatar: foundUser.avatar,
      isVerified: foundUser.isVerified,
      notifications: foundUser.notifications,
      roles: foundUser.roles,
      isActive: foundUser.isActive,
      isOnline: foundUser.isOnline
    }

    const token = await createJwtToken(payload)
    res.json(token)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = signIn
