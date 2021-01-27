const createJwtToken = require('../../utils/createJwtToken')
const isEmpty = require('../../utils/isEmpty')
const slugify = require('../../utils/slugify')
const User = require('../../models/User')
const validateUsernameChange = require('../../validation/validateUsernameChange')

async function usernameChange(req, res) {
  try {
    const { errors } = validateUsernameChange(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const foundUserByUsername = await User.findOne({ username: req.body.username })

    if (foundUserByUsername) {
      errors.username = 'Username is already taken'
      res.status(404).json(errors)
      return
    }

    const foundUserById = await User.findById(req.body.id)
    foundUserById.username = slugify(req.body.username)
    const savedUser = await foundUserById.save()

    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      avatar: savedUser.avatar,
      isVerified: savedUser.isVerified,
      notifications: savedUser.notifications,
      roles: savedUser.roles,
      isOnline: savedUser.isOnline
    }

    const token = await createJwtToken(payload)
    res.json({ message: 'Username changed successfully.', variant: 'success', token })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = usernameChange
