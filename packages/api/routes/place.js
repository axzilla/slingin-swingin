const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const getAllPlaces = require('../controller/place/getAllPlaces')
const getPlaceByShortId = require('../controller/place/getPlaceByShortId')
const getPlacePhotos = require('../controller/place/getPlacePhotos')
const placeCreate = require('../controller/place/placeCreate')
const getPlacesBySearchTerm = require('../controller/place/getPlacesBySearchTerm')

router.get('/get-all-places', getAllPlaces)
router.get('/get-place-by-short-id/:shortId', getPlaceByShortId)
router.get('/get-place-photos/:urlSlug', getPlacePhotos)
router.post('/get-places-by-search-term', getPlacesBySearchTerm)
router.post('/place-create', authenticate(), placeCreate)

module.exports = router
