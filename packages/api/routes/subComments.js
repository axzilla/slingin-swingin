const express = require('express')
const router = express.Router()
const passport = require('passport')

const Comment = require('../models/Comment')
const SubComment = require('../models/SubComment')

// Create Subcomment
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { text, refComment } = req.body
  const { id } = req.user

  const newSubComment = {
    text,
    refComment,
    user: id
  }

  try {
    const createdSubComment = await SubComment.create(newSubComment)
    const foundSubComment = await SubComment.findById(createdSubComment._id).populate('user')
    const updatedComment = await Comment.findById(createdSubComment.refComment._id)
    await updatedComment.subComments.push(createdSubComment._id)
    await updatedComment.save()

    res.json(foundSubComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Subcomment by ID
router.get('/:commentId', (req, res) => {
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
      const updatedComment = await Comment.findById(deletedSubcomment.refComment)

      const CommentSubCommentIndex = await updatedComment.subComments.indexOf(deletedSubcomment._id)

      await updatedComment.subComments.splice(CommentSubCommentIndex, 1)
      await updatedComment.save()

      res.json(deletedSubcomment)
    } catch (err) {
      console.log(err) // eslint-disable-line no-console
    }
  }
)

module.exports = router
