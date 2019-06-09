const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
var fs = require('fs')

// Load Validation
const validateProfileInput = require('../validation/profile')

// Load Profile Model
const Profile = require('../models/Profile')
// Load User Model
const User = require('../models/User')

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'username', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'Es existiert kein Profil für diesen Benutzer'
        return res.status(404).json(errors)
      }

      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/all
// @desc    Get all profiles if verified
// @access  Public
router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'username', 'avatar', 'isVerified'])
    .sort({ dateCreated: -1 })
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'Keine Profile gefunden'
        return res.status(404).json(errors)
      }
      const verifiedUser = profiles.filter(profile => profile.user && profile.user.isVerified)
      res.json(verifiedUser)
    })
    .catch(err => res.status(404).json({ profile: 'Keine Profile gefunden' }))
})

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle if verified
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'username', 'avatar', 'isVerified'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'Es existiert kein Profil für diesen Benutzer'
        res.status(404).json(errors)
      }

      const notVerified = {
        _id: '5bfb2cabbbf203a051349b02',
        name: 'Nicht verifziert',
        user: {
          isVerified: false,
          _id: '5bfb2caabbf203a051349b01',
          username: 'Nicht verifziert',
          avatar: 'https://source.unsplash.com/random'
        },
        handle: 'codehustla'
      }

      const isVerified = profile.user.isVerified ? profile : notVerified
      res.json(isVerified)
    })
    .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:id', (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'username', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'Es existiert kein Profil für diesen Benutzer'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({ profile: 'Es existiert kein Profil für diesen Benutzer' }))
})

// Create or edit user profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  if (!isValid) {
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

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
        .populate('user', ['name', 'username', 'avatar'])
        .then(profile => res.json({ profile }))
    } else {
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists'
          res.status(400).json(errors)
        }
        new Profile(profileFields).save().then(profile => res.json({ profile }))
      })
    }
  })
})

module.exports = router
