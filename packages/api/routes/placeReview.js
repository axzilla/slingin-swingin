const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const createPlaceReview = require('../controller/placeReview/createPlaceReview')
const updatePlaceReview = require('../controller/placeReview/updatePlaceReview')
const getPlaceReviewsByPlaceId = require('../controller/placeReview/getPlaceReviewsByPlaceId')

router.post('/create-placereview', authenticate(), createPlaceReview)
router.post('/update-placereview', authenticate(), updatePlaceReview)
router.get('/get-place-reviews-by-place-id/:placeId', getPlaceReviewsByPlaceId)

module.exports = router
