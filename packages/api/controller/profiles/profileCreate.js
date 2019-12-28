const Profile = require('../../models/Profile')
const validateProfile = require('../../validation/validateProfile')
const isEmpty = require('../../utils/isEmpty')

async function profileCreate(req, res) {
  try {
    const { errors } = validateProfile(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const profileFields = {}
    profileFields.user = req.user.id

    profileFields.handle = req.user.username

    profileFields.color = ''
    profileFields.name = ''
    profileFields.github = ''
    profileFields.gitlab = ''
    profileFields.bitbucket = ''

    profileFields.company = ''
    profileFields.status = ''
    profileFields.website = ''
    profileFields.location = ''
    profileFields.bio = ''

    if (req.body.name) profileFields.name = req.body.name
    if (req.body.color) profileFields.color = req.body.color
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.github) profileFields.github = req.body.github
    if (req.body.gitlab) profileFields.gitlab = req.body.gitlab
    if (req.body.bitbucket) profileFields.bitbucket = req.body.bitbucket

    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.xing) profileFields.social.xing = req.body.xing
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram
    if (req.body.pinterest) profileFields.social.pinterest = req.body.pinterest

    const foundProfile = await Profile.findOne({ user: req.user.id })

    if (foundProfile) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate('user', ['name', 'username', 'avatar'])

      res.json({ updatedProfile })
    } else {
      const foundProfile = await Profile.findOne({ handle: profileFields.handle })

      if (foundProfile) {
        errors.handle = 'That handle already exists'
        res.status(400).json(errors)
      }

      const createdProfile = await new Profile(profileFields).save()
      res.json({ createdProfile })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = profileCreate
