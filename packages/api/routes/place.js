const express = require('express')
const router = express.Router()

const getAllPlaces = require('../controller/place/getAllPlaces')

router.get('/get-all-places', getAllPlaces)

module.exports = router
