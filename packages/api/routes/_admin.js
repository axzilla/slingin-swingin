const express = require('express')
const router = express.Router()

const places = require('../controller/_admin/places')

router.get('/places/:search', places)

module.exports = router
