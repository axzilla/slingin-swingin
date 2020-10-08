const bcrypt = require('bcryptjs')
const createJwtToken = require('../../utils/createJwtToken')
const isEmpty = require('../../utils/isEmpty')
const validateLogin = require('../../validation/validateLogin')
const User = require('../../models/User')

async function login(req, res) {
  try {
    const { login, password } = req.body
    const { errors } = validateLogin(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findOne({
      $or: [{ email: login.toLowerCase() }, { username: login.toLowerCase() }]
    })

    if (!foundUser) {
      errors.login = 'User not found'
      return res.status(400).json(errors)
    }

    if (!foundUser.isActive) {
      errors.login =
        'Account is not active. Please check your eMail inbox to activate your account or resend activation eMail'
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

module.exports = login
