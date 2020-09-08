const express = require('express')
const router = express.Router()
const search = require('../controller/search/search')

router.get('/:searchText', search)

module.exports = router
