const express = require('express')
const router = express.Router()

const getAllUsers = require('../controller/sitemap/getAllUsers')
const getAllPosts = require('../controller/sitemap/getAllPosts')

router.get('/get-all-users', getAllUsers)
router.get('/get-all-posts', getAllPosts)

module.exports = router
