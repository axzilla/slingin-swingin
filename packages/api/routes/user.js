const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const updateUser = require('../controller/user/updateUser')
const getAllUsers = require('../controller/user/getAllUsers')
const getCurrentUser = require('../controller/user/getCurrentUser')
const getUserByUsername = require('../controller/user/getUserByUsername')

router.post('/update-user', authenticate(), updateUser)
router.get('/get-all-users', getAllUsers)
router.get('/get-current-user', authenticate(), getCurrentUser)
router.get('/get-user-by-username/:username', getUserByUsername)

module.exports = router
