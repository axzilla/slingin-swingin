const express = require('express')
const router = express.Router()
const multer = require('multer')
const authenticate = require('../utils/authenticate')
const upload = multer()

const getMediaFilesByPostId = require('../controller/mediaFile/getMediaFilesByPostId')
const createMediaFiles = require('../controller/mediaFile/createMediaFiles')
const deleteMediaFiles = require('../controller/mediaFile/deleteMediaFiles')

router.get('/get-mediafiles-by-post-id/:postId', getMediaFilesByPostId)
router.post('/create-mediafiles', authenticate(), upload.array('mediafile'), createMediaFiles)
router.post('/delete-mediafiles', authenticate(), deleteMediaFiles)

module.exports = router
