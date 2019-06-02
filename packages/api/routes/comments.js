const express = require('express')
const router = express.Router()
const passport = require('passport')
const io = require('../socket')

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

const validateCommentInput = require('../validation/commentInput')

const mtuCommentNewIfPostOwner = require('../nodemailer/templates/mtuCommentNewIfPostOwner')
const mtuCommentNewIfPostBookmarked = require('../nodemailer/templates/mtuCommentNewIfPostBookmarked')
const mtuCommentNewIfPostCommented = require('../nodemailer/templates/mtuCommentNewIfPostCommented')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
      refPostId: req.body.refPostId,
      refPostShortId: req.body.refPostShortId,
      refCommentId: req.body.refCommentId,
      likes: []
    }

    Comment.create(newComment).then(comment => {
      Post.findById(req.body.refPostId)
        .populate('user')
        .populate('comments')
        .populate('comments.user')
        .populate('bookmarks.user')
        .then(post => {
          post.comments.push(comment.id)
          post.save()

          // Send Mail to User - New Comment - If Post Owner
          User.findById(post.user.id).then(user => {
            if (user.notifications.onOwnPost && user.id !== req.user.id) {
              mtuCommentNewIfPostOwner(post, user)
            }
          })

          // Send Mail to User - New Comment - If Post Bookmarked
          if (post.bookmarks.length > 0) {
            post.bookmarks
              .filter(bookmark => {
                return (
                  bookmark.user.notifications.onBookmarkedPost &&
                  bookmark.user.id !== req.user.id
                )
              })
              .map(bookmark => {
                mtuCommentNewIfPostBookmarked(post, bookmark.user)
              })
          }

          // Send Mail to User - New Comment - If Post Commented
          if (post.comments.length > 0) {
            let userIdArray = post.comments.map(comment => {
              return comment.user
            })

            User.find({ _id: { $in: userIdArray } }, (err, users) => {
              users
                .filter(user => {
                  return (
                    user.notifications.onCommentedPost &&
                    user.id !== req.user.id
                  )
                })
                .map(user => {
                  mtuCommentNewIfPostCommented(post, user)
                })
            })
          }
        })
        .then(() => {
          Comment.findById(comment._id)
            .populate('user', ['name', 'username', 'avatar'])
            .then(comment => {
              res.json(comment)
            })
        })
    })
  }
)

// Get Comments by PostRef
router.get('/:postShortId', (req, res) => {
  Comment.find({ refPostShortId: req.params.postShortId })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(comments => res.json(comments))
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
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { commentId, text } = req.body
    Comment.findById(commentId)
      .populate('user', ['name', 'username', 'avatar'])
      .then(comment => {
        comment.text = text
        comment.save().then(comment => {
          // io.getIO().emit('comments', { action: 'update', comment })
          res.json(comment)
        })

        // Comment.find().then(comments => {
        //   console.log(comments)
        //   io.getIO().emit('comments', { action: 'update', comments })
        //   res.json(comments)
        // })
      })
  }
)

// Delete Comment
router.post(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findByIdAndDelete(req.body.commentId).then(comment => {
      Comment.deleteMany({ refCommentId: req.body.commentId }, (err, data) => {
        err ? console.log(err) : console.log('All subcomments deleted!')
      })

      Post.findById(comment.refPostId).then(post => {
        commentIndex = post.comments.indexOf(comment._id)
        post.comments.splice(commentIndex, 1)
        post.save()
        // res.json(post)
        res.json(comment)
      })
    })
  }
)

// Update Comment Likes
router.post(
  '/likes/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.commentId)
      .then(comment => {
        if (
          comment.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          const removeIndex = comment.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          comment.likes.splice(removeIndex, 1)
          comment.save().then(comment => res.json(comment))
        } else if (
          comment.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          comment.likes.unshift({ user: req.user.id })
          comment.save().then(comment => res.json(comment))
        }
      })
      .catch(err =>
        res.status(404).json({ commentnotfound: 'Keinen Kommentar gefunden' })
      )
  }
)

module.exports = router
