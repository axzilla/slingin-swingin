const express = require('express')
const router = express.Router()
const passport = require('passport')

const SubComment = require('../models/SubComment')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newSubComment = {
      text: req.body.text,
      user: req.user.id,
      commentRef: req.body.commentRef
    }

    SubComment.create(newSubComment).then(createdSubComment => {
      SubComment.findById(createdSubComment._id)
        .populate('user')
        .then(foundSubComment => {
          res.json(foundSubComment)
        })
    })
  }
)

router.get('/:commentId', (req, res) => {
  SubComment.find({ commentRef: req.params.commentId })
    .populate('user')
    .then(foundSubComments => {
      res.json(foundSubComments)
    })
})

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SubComment.findById(req.body.subCommentId)
      .populate('user')
      .then(foundSubComment => {
        foundSubComment.text = req.body.text
        foundSubComment.save().then(updatedSubComment => {
          res.json(updatedSubComment)
        })
      })
  }
)

router.delete(
  '/:subCommentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    SubComment.findByIdAndDelete(req.params.subCommentId).then(
      deletedSubComment => {
        res.json(deletedSubComment)
      }
    )
  }
)

module.exports = router
