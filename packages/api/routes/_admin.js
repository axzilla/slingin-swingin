const express = require('express')
const router = express.Router()

const getMapboxPlaces = require('../controller/_admin/getMapboxPlaces')
const getPlaceImages = require('../controller/_admin/getPlaceImages')

router.get('/get-mapbox-places/:search', getMapboxPlaces)
router.get('/get-place-images/:search', getPlaceImages)

module.exports = router
