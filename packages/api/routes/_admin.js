const express = require('express')
const router = express.Router()

const getMapboxPlaces = require('../controller/_admin/getMapboxPlaces')
const getPlaceImages = require('../controller/_admin/getPlaceImages')
const createPlace = require('../controller/_admin/createPlace')

router.get('/get-mapbox-places/:search', getMapboxPlaces)
router.get('/get-place-images/:search', getPlaceImages)
router.post('/create-place', createPlace)

module.exports = router
