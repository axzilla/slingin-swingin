const Profile = require('../../models/Profile')
const validateProfile = require('../../validation/validateProfile')
const isEmpty = require('../../utils/isEmpty')

async function profileUpdate(req, res) {
  try {
    const { errors } = validateProfile(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body },
      { new: true }
    )

    updatedProfile.dateUpdated = Date.now()
    updatedProfile.save()

    res.json(updatedProfile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = profileUpdate
