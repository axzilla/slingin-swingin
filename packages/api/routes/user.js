const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const updateUser = require('../controller/user/updateUser')
const getAllUsers = require('../controller/user/getAllUsers')
const getCurrentUser = require('../controller/user/getCurrentUser')
const getUserByUsername = require('../controller/user/getUserByUsername')
const getPlaceCurrentUsersByPlaceId = require('../controller/user/getPlaceCurrentUsersByPlaceId')
const getPlaceBeenUsersByPlaceId = require('../controller/user/getPlaceBeenUsersByPlaceId')
const getPlaceWantUsersByPlaceId = require('../controller/user/getPlaceWantUsersByPlaceId')

router.post('/update-user', authenticate(), updateUser)
router.get('/get-all-users', getAllUsers)
router.get('/get-current-user', authenticate(), getCurrentUser)
router.get('/get-user-by-username/:username', getUserByUsername)
router.get('/get-place-current-users-by-place-id/:placeId', getPlaceCurrentUsersByPlaceId)
router.get('/get-place-been-users-by-place-id/:placeId', getPlaceBeenUsersByPlaceId)
router.get('/get-place-want-users-by-place-id/:placeId', getPlaceWantUsersByPlaceId)

module.exports = router
