const express = require('express')
const router = express.Router()
const passport = require('passport')

const Comment = require('../models/Comment')
const SubComment = require('../models/SubComment')

// Create Comment
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { text, refPost } = req.body
    const { id } = req.user

    const newComment = {
      text,
      refPost,
      user: id
    }

    const createdComment = await Comment.create(newComment)
    const foundComment = await Comment.findById(createdComment._id).populate('user')
    res.json(foundComment)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Comments by Post Ref
router.get('/:refPost', async (req, res) => {
  try {
    const { refPost } = req.params

    const foundComments = await Comment.find({ refPost })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundComments)
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Get Comments User ID
router.get('/getByUserId/:userId', async (req, res) => {
  try {
    const foundComments = await Comment.find({ user: req.params.userId })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])
      .populate('refPost', ['title', 'shortId', 'urlSlug'])

    res.json(foundComments)
  } catch (error) {
    if (error) throw error
  }
})

// Update Comment
router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { commentId, text } = req.body

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
router.post(
  '/upvote/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const foundComment = await Comment.findById(req.params.commentId).populate('user')

      if (
        foundComment.votes.upvotes.filter(upvote => {
          return upvote.user.toString() === req.user.id
        }).length > 0
      ) {
        const removeIndex = foundComment.votes.upvotes
          .map(item => item.user.toString())
          .indexOf(req.user.id)

        foundComment.votes.upvotes.splice(removeIndex, 1)
        const savedComment = await foundComment.save()

        res.json(savedComment)
      } else if (
        foundComment.votes.upvotes.filter(upvote => {
          upvote.user.toString() === req.user.id
        }).length === 0
      ) {
        if (
          foundComment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id)
            .length > 0
        ) {
          const downvoteRemoveIndex = foundComment.votes.downvotes
            .map(downvote => downvote.user.toString())
            .indexOf(req.user.id)

          foundComment.votes.downvotes.splice(downvoteRemoveIndex, 1)
        }

        foundComment.votes.upvotes.unshift({ user: req.user.id })
        const savedComment = await foundComment.save()

        res.json(savedComment)
      }
    } catch (error) {
      if (error) throw error
    }
  }
)

// Downvote Comment
router.post(
  '/downvote/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const foundComment = await Comment.findById(req.params.commentId).populate('user')

      if (
        foundComment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id)
          .length > 0
      ) {
        const downvoteRemoveIndex = foundComment.votes.downvotes
          .map(downvote => downvote.user.toString())
          .indexOf(req.user.id)

        foundComment.votes.downvotes.splice(downvoteRemoveIndex, 1)

        const savedComment = await foundComment.save()
        res.json(savedComment)
      } else if (
        foundComment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user.id)
          .length === 0
      ) {
        if (
          foundComment.votes.upvotes.filter(upvote => upvote.user.toString() === req.user.id)
            .length > 0
        ) {
          const upvoteRemoveIndex = foundComment.votes.upvotes
            .map(upvote => upvote.user.toString())
            .indexOf(req.user.id)

          foundComment.votes.upvotes.splice(upvoteRemoveIndex, 1)
        }

        foundComment.votes.downvotes.unshift({ user: req.user.id })

        const savedComment = await foundComment.save()
        res.json(savedComment)
      }
    } catch (error) {
      if (error) throw error
    }
  }
)

module.exports = router
