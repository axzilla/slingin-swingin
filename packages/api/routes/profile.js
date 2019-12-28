const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const profileCreate = require('../controller/profiles/profileCreate')
const getAllProfiles = require('../controller/profiles/getAllProfiles')
const getProfileByCurrentUser = require('../controller/profiles/getProfileByCurrentUser')
const getProfileByHandle = require('../controller/profiles/getProfileByHandle')

router.post('/create-profile', authenticate(), profileCreate)
router.get('/get-all-profiles', getAllProfiles)
router.get('/get-profile-by-current-user', authenticate(), getProfileByCurrentUser)
router.get('/get-profile-by-handle/:handle', getProfileByHandle)

module.exports = router
