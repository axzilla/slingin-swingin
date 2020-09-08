const express = require('express')
const router = express.Router()

const generateUser = require('../controller/_admin/generateUser')

router.post('/generate-user', generateUser)

module.exports = router
