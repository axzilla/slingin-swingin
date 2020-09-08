const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const commentCreate = require('../controller/comments/commentCreate')
const commentUpdate = require('../controller/comments/commentUpdate')
const commentDelete = require('../controller/comments/commentDelete')
const commentUpvote = require('../controller/comments/commentUpvote')
const commentDownvote = require('../controller/comments/commentDownvote')
const getCommentsByPostRef = require('../controller/comments/getCommentsByPostRef')
const getCommentsByUserId = require('../controller/comments/getCommentsByUserId')

router.post('/comment-create', authenticate(), commentCreate)
router.patch('/comment-update', authenticate(), commentUpdate)
router.delete('/comment-delete', authenticate(), commentDelete)
router.post('/comment-upvote/:commentId', authenticate(), commentUpvote)
router.post('/comment-downvote/:commentId', authenticate(), commentDownvote)
router.get('/get-comments-by-post-ref/:post', getCommentsByPostRef)
router.get('/get-comments-by-user-id/:userId', getCommentsByUserId)

module.exports = router
