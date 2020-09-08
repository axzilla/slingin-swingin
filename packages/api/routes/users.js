const express = require('express')
const router = express.Router()

const getOnlineUsers = require('../controller/users/getOnlineUsers')

router.get('/get-online-users', getOnlineUsers)

module.exports = router
