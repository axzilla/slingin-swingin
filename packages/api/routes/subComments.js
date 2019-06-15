const express = require('express')
const router = express.Router()
const passport = require('passport')

const SubComment = require('../models/SubComment')

// Create Subcomment
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { text, refPost, refComment } = req.body
  const { id } = req.user

  const newSubComment = {
    text,
    refPost,
    refComment,
    user: id
  }

  try {
    const createdSubComment = await SubComment.create(newSubComment)
    const foundSubComment = await SubComment.findById(createdSubComment._id).populate('user')
    res.json(foundSubComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Subcomments by Post Ref
router.get('/get-by-post-ref/:postId', (req, res) => {
  SubComment.find({ refPost: req.params.postId })
    .populate('user')
    .then(foundSubComments => {
      res.json(foundSubComments)
    })
})

// Get Subcomments by Comment Ref
router.get('/get-by-comment-ref/:commentId', (req, res) => {
  SubComment.find({ refComment: req.params.commentId })
    .populate('user')
    .then(foundSubComments => {
      res.json(foundSubComments)
    })
})

// Update Subcomment by Subcomment ID
router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  SubComment.findById(req.body.subCommentId)
    .populate('user')
    .then(foundSubComment => {
      foundSubComment.text = req.body.text
      foundSubComment.save().then(updatedSubComment => {
        res.json(updatedSubComment)
      })
    })
})

// Delete Subcomment by Subcomment ID
router.delete(
  '/:subCommentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { subCommentId } = req.params
    try {
      const deletedSubcomment = await SubComment.findByIdAndDelete(subCommentId)
      res.json(deletedSubcomment)
    } catch (err) {
      console.log(err) // eslint-disable-line no-console
    }
  }
)

module.exports = router
