// Models
const User = require('../../models/User')

// Validation
const validateProfile = require('../../validation/validateProfile')

// Utils
const isEmpty = require('../../utils/isEmpty')

async function updateUser(req, res) {
  try {
    const { errors } = validateProfile(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const profile = { ...req.body }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, profile, {
      new: true
    })
      .populate('locationFrom')
      .populate('locationCurrent')

    res.json(updatedUser)
  } catch (error) {
    console.error(error) // eslint-disable-line
  }
}

module.exports = updateUser
