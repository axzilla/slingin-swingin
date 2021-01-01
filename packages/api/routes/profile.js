const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const profileUpdate = require('../controller/profiles/profileUpdate')
const getAllProfiles = require('../controller/profiles/getAllProfiles')
const getProfileByCurrentUser = require('../controller/profiles/getProfileByCurrentUser')
const getProfileByHandle = require('../controller/profiles/getProfileByHandle')
const getLocations = require('../controller/profiles/getLocations')

router.post('/profile-update', authenticate(), profileUpdate)
router.get('/get-all-profiles', getAllProfiles)
router.get('/get-profile-by-current-user', authenticate(), getProfileByCurrentUser)
router.get('/get-profile-by-handle/:handle', getProfileByHandle)
router.post('/get-locations', getLocations)

module.exports = router
