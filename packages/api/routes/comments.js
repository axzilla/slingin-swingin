const express = require('express')
const router = express.Router()
const passport = require('passport')

const Comment = require('../models/Comment')
const SubComment = require('../models/SubComment')

// Create Comment
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { text, refPost } = req.body
  const { id } = req.user

  const newComment = {
    text,
    refPost,
    user: id
  }

  try {
    const createdComment = await Comment.create(newComment)
    const foundComment = await Comment.findById(createdComment._id).populate('user')
    res.json(foundComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Comments by Post Ref
router.get('/:refPost', async (req, res) => {
  const { refPost } = req.params

  try {
    const foundComments = await Comment.find({ refPost })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundComments)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Comments User ID
router.get('/getByUserId/:userId', (req, res) => {
  Comment.find({ user: req.params.userId })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .populate('refPost', ['title', 'shortId', 'urlSlug'])
    .then(comments => res.json(comments))
})

// Update Comment
router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { commentId, text } = req.body

  try {
    const updatedComment = await Comment.findById(commentId).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    updatedComment.text = text
    updatedComment.save()

    res.json(updatedComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Delete Comment and Subcomments by Comment ID
router.post('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.body.commentId)
    await SubComment.deleteMany({ refComment: deletedComment._id })
    res.json(deletedComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Upvote Comment
router.post('/upvote/:commentId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Comment.findById(req.params.commentId)
    .populate('user')
    .then(comment => {
      if (
        comment.votes.upvotes.filter(upvote => {
          return upvote.user.toString() === req.user.id
        }).length > 0
      ) {
        const removeIndex = comment.votes.upvotes
          .map(item => item.user.toString())
          .indexOf(req.user.id)

        comment.votes.upvotes.splice(removeIndex, 1)
        comment.save().then(comment => res.json(comment))
      } else if (
        comment.votes.upvotes.filter(upvote => {
          upvote.user.toString() === req.user.id
        }).length === 0
      ) {
        if (
          comment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id)
            .length > 0
        ) {
          const downvoteRemoveIndex = comment.votes.downvotes
            .map(downvote => downvote.user.toString())
            .indexOf(req.user.id)

          comment.votes.downvotes.splice(downvoteRemoveIndex, 1)
        }

        comment.votes.upvotes.unshift({ user: req.user.id })
        comment.save().then(comment => res.json(comment))
      }
    })
    .catch(() => res.status(404).json({ commentnotfound: 'Keinen Kommentar gefunden' }))
})

// Downvote Comment
router.post(
  '/downvote/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.commentId)
      .populate('user')
      .then(comment => {
        if (
          comment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id)
            .length > 0
        ) {
          const downvoteRemoveIndex = comment.votes.downvotes
            .map(downvote => downvote.user.toString())
            .indexOf(req.user.id)

          comment.votes.downvotes.splice(downvoteRemoveIndex, 1)

          comment.save().then(comment => res.json(comment))
        } else if (
          comment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id)
            .length === 0
        ) {
          if (
            comment.votes.upvotes.filter(upvote => upvote.user.toString() === req.user.id).length >
            0
          ) {
            const upvoteRemoveIndex = comment.votes.upvotes
              .map(upvote => upvote.user.toString())
              .indexOf(req.user.id)

            comment.votes.upvotes.splice(upvoteRemoveIndex, 1)
          }

          comment.votes.downvotes.unshift({ user: req.user.id })

          comment.save().then(comment => res.json(comment))
        }
      })
      .catch(() => res.status(404).json({ commentnotfound: 'Keinen Beitrag gefunden' }))
  }
)

module.exports = router
