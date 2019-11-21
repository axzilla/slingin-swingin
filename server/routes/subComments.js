const express = require('express')
const router = express.Router()
const passport = require('passport')

const SubComment = require('../models/SubComment')

// Create Subcomment
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { text, refPost, refComment } = req.body
    const { id } = req.user

    const newSubComment = {
      text,
      refPost,
      refComment,
      user: id
    }

    const createdSubComment = await SubComment.create(newSubComment)
    const foundSubComment = await SubComment.findById(createdSubComment._id).populate('user')
    res.json(foundSubComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Subcomments by User ID
router.get('/get-by-user-id/:userId', async (req, res) => {
  try {
    const foundSubComments = await SubComment.find({ user: req.params.userId })
      .populate('user')
      .populate('refPost', ['title', 'shortId', 'urlSlug'])

    res.json(foundSubComments)
  } catch (error) {
    if (error) throw error
  }
})

// Get Subcomments by Post Ref
router.get('/get-by-post-ref/:postId', async (req, res) => {
  try {
    const foundSubComments = await SubComment.find({ refPost: req.params.postId }).populate('user')
    res.json(foundSubComments)
  } catch (error) {
    if (error) throw error
  }
})

// Get Subcomments by Comment Ref
router.get('/get-by-comment-ref/:commentId', async (req, res) => {
  try {
    const foundSubComments = await SubComment.find({ refComment: req.params.commentId }).populate(
      'user'
    )

    res.json(foundSubComments)
  } catch (error) {
    if (error) throw error
  }
})

// Update Subcomment by Subcomment ID
router.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const foundSubComment = await SubComment.findById(req.body.subCommentId).populate('user')
    foundSubComment.text = req.body.text
    const savedSubComment = await foundSubComment.save()
    res.json(savedSubComment)
  } catch (error) {
    if (error) throw error
  }
})

// Delete Subcomment by Subcomment ID
router.delete(
  '/:subCommentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { subCommentId } = req.params
      const deletedSubcomment = await SubComment.findByIdAndDelete(subCommentId)
      res.json(deletedSubcomment)
    } catch (error) {
      if (error) throw error
    }
  }
)

module.exports = router
