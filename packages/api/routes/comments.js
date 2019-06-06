const express = require('express')
const router = express.Router()
const passport = require('passport')

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const SubComment = require('../models/SubComment')
const User = require('../models/User')

const mtuCommentNewIfPostOwner = require('../nodemailer/templates/mtuCommentNewIfPostOwner')
const mtuCommentNewIfPostBookmarked = require('../nodemailer/templates/mtuCommentNewIfPostBookmarked')
const mtuCommentNewIfPostCommented = require('../nodemailer/templates/mtuCommentNewIfPostCommented')

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

    const updatedPost = await Post.findById(createdComment.refPost)
      .populate('user')
      .populate('comments')
      .populate('comments.user')
      .populate('bookmarks.user')

    updatedPost.comments.push(createdComment.id)
    updatedPost.save()

    // Send Mail to User - New Comment - If Post Owner
    User.findById(updatedPost.user.id).then(user => {
      if (user.notifications.onOwnPost && user.id !== req.user.id) {
        mtuCommentNewIfPostOwner(updatedPost, user)
      }
    })

    // Send Mail to User - New Comment - If Post Bookmarked
    if (updatedPost.bookmarks.length > 0) {
      updatedPost.bookmarks
        .filter(bookmark => {
          return bookmark.user.notifications.onBookmarkedPost && bookmark.user.id !== req.user.id
        })
        .map(bookmark => {
          mtuCommentNewIfPostBookmarked(updatedPost, bookmark.user)
        })
    }

    // Send Mail to User - New Comment - If Post Commented
    if (updatedPost.comments.length > 0) {
      let userIdArray = updatedPost.comments.map(comment => {
        return comment.user
      })

      User.find({ _id: { $in: userIdArray } }, (err, users) => {
        users
          .filter(user => {
            return user.notifications.onCommentedPost && user.id !== req.user.id
          })
          .map(user => {
            mtuCommentNewIfPostCommented(updatedPost, user)
          })
      })
    }

    const foundComment = await Comment.findById(createdComment._id).populate('user', [
      'name',
      'username',
      'avatar'
    ])

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
    .populate('refPostId', ['title', 'shortId', 'urlSlug'])
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

// Delete Comment
router.post('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.body.commentId)
    await SubComment.deleteMany({ refComment: deletedComment._id })
    const updatedPost = await Post.findById(deletedComment.refPost)
    const postCommentIndex = updatedPost.comments.indexOf(deletedComment._id)

    updatedPost.comments.splice(postCommentIndex, 1)
    updatedPost.save()

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
