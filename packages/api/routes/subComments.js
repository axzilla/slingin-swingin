const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const subCommentCreate = require('../controller/subcomments/subCommentCreate')
const subCommentUpdate = require('../controller/subcomments/subCommentUpdate')
const subCommentDelete = require('../controller/subcomments/subCommentDelete')
const getSubCommentsByUserId = require('../controller/subcomments/getSubCommentsByUserId')
const getSubCommentsByPostRef = require('../controller/subcomments/getSubCommentsByPostRef')
const getSubCommentsByCommentRef = require('../controller/subcomments/getSubCommentsByCommentRef')

router.post('/create', authenticate(), subCommentCreate)
router.patch('/update', authenticate(), subCommentUpdate)
router.delete('/delete', authenticate(), subCommentDelete)
router.get('/get-subcomment-by-user-id/:userId', getSubCommentsByUserId)
router.get('/get-subcomment-by-post-ref/:postId', getSubCommentsByPostRef)
router.get('/get-subcomment-by-comment-ref/:commentId', getSubCommentsByCommentRef)

module.exports = router
