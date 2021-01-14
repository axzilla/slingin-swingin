const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const profileUpdate = require('../controller/profiles/profileUpdate')
const getAllProfiles = require('../controller/profiles/getAllProfiles')
const getProfileByCurrentUser = require('../controller/profiles/getProfileByCurrentUser')
const getProfileByHandle = require('../controller/profiles/getProfileByHandle')
const getPlaceCurrentProfilesByPlaceId = require('../controller/profiles/getPlaceCurrentProfilesByPlaceId')
const getPlaceBeenProfilesByPlaceId = require('../controller/profiles/getPlaceBeenProfilesByPlaceId')
const getPlaceWantProfilesByPlaceId = require('../controller/profiles/getPlaceWantProfilesByPlaceId')

router.post('/profile-update', authenticate(), profileUpdate)
router.get('/get-all-profiles', getAllProfiles)
router.get('/get-profile-by-current-user', authenticate(), getProfileByCurrentUser)
router.get('/get-profile-by-handle/:handle', getProfileByHandle)
router.get('/get-place-current-profiles-by-place-id/:placeId', getPlaceCurrentProfilesByPlaceId)
router.get('/get-place-been-profiles-by-place-id/:placeId', getPlaceBeenProfilesByPlaceId)
router.get('/get-place-want-profiles-by-place-id/:placeId', getPlaceWantProfilesByPlaceId)

module.exports = router
