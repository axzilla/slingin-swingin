const express = require('express')
const router = express.Router()
const passport = require('passport')
const slugify = require('../helpers/slugify')
const multer = require('multer')
const cloudinary = require('../config/cloudinary')

const upload = multer()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const SubComment = require('../models/SubComment')
const User = require('../models/User')

const validatePostInput = require('../validation/posts')

const mtuPostNew = require('../nodemailer/templates/mtuPostNew')

// Get All Posts
router.get('/', (req, res) => {
  Post.find()
    .populate('user', ['name', 'username', 'avatar'])
    .sort({ isPinned: -1 })
    .sort({ dateCreated: -1 })
    .then(posts => {
      res.json(posts)
    })
    .catch(() => res.status(404).json({ nopostsfound: 'Keine Beiträge gefunden' }))
})

// Get Posts By User ID
router.get('/getPosts/published/userId/:id', (req, res) => {
  Post.find({ user: req.params.id })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      res.json(posts)
    })
    .catch(() => res.status(404).json({ nopostfound: 'Keine Beträge gefunden' }))
})

// Get Posts By User Bookmarks
router.get('/getposts/bookmark/:user_id', (req, res) => {
  Post.find({ 'bookmarks.user': req.params.user_id })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      res.json(posts)
    })
    .catch(() => res.status(404).json({ nopostfound: 'Keine Beträge gefunden' }))
})

// Get Posts By Tag
router.get('/getposts/tag/:tag', (req, res) => {
  Post.find({ tags: req.params.tag })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      res.json(posts)
    })
    .catch(() => res.status(404).json({ nopostfound: 'Keine Beträge gefunden' }))
})

// Get All Posts Tag Once With Count
router.get('/getAllTags', (req, res) => {
  Post.distinct('tags')
  Post.aggregate([{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }])
    .sort({ count: -1 })
    .then(tags => res.json(tags))
    .catch(() => res.status(404).json({ notagsfound: 'Keine Tags gefunden' }))
})

// Get Post By ID
router.get('/get-post/:postId', (req, res) => {
  Post.findById(req.params.postId)
    .populate('user', ['name', 'username', 'avatar'])
    .then(post => {
      if (!post) {
        res.status(404)
      }

      res.json(post)
    })
    .catch(() => res.status(404).json({ nopostfound: 'Keinen Betrag mit dieser ID gefunden' }))
})

// Get Post By Short ID
router.get('/short/:post_id', (req, res) => {
  Post.findOne({ shortId: req.params.post_id })
    .populate('user', ['name', 'username', 'avatar'])
    .then(post => {
      if (!post) {
        res.status(404)
      }

      res.json(post)
    })
    .catch(() => res.status(404).json({ nopostfound: 'Keine Beträge mit dieser ID gefunden' }))
})

// Create Post
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  upload.single('titleImage'),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { title, text, type, tags } = req.body
    const { user } = req

    const postFields = {}

    Object.assign(postFields, {
      urlSlug: slugify(title),
      user: user.id,
      title,
      text,
      type,
      tags: tags ? tags.split(',') : []
    })

    Post.create(postFields).then(post => {
      if (req.file) {
        const { mimetype, buffer } = req.file
        const file = `data:${mimetype};base64,${buffer.toString('base64')}`

        cloudinary.v2.uploader
          .upload(file, {
            folder: process.env.CLOUDINARY_PATH_POST_TITLE,
            public_id: `post-title-image-${post.id}`
          })
          .then((result, err) => {
            if (err) {
              console.log(err) // eslint-disable-line no-console
            } else {
              console.log('Avatar uploaded') // eslint-disable-line no-console
              post.titleImage = result
              post.save().then(() => {
                res.json(post)
              })
            }
          })
      } else {
        res.json(post)
      }

      // Send Mail to User - New POST - If onNewPost
      User.find().then(users => {
        users
          .filter(user => {
            return user.notifications.onNewPost
          })
          .map(user => {
            mtuPostNew(post, user)
          })
      })
    })
  }
)

// Edit Post
router.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  upload.single('titleImage'),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const { titleImage, title, text, type, tags } = req.body
    const postFields = {}

    Object.assign(postFields, {
      urlSlug: slugify(title),
      title,
      text,
      type,
      tags: tags ? tags.split(',') : []
    })

    Post.findByIdAndUpdate(req.body.id, postFields)
      .populate('bookmarks.user', ['email', 'username'])
      .then(post => {
        if (req.file) {
          const { mimetype, buffer } = req.file
          const file = `data:${mimetype};base64,${buffer.toString('base64')}`
          cloudinary.v2.uploader
            .upload(file, {
              folder: process.env.CLOUDINARY_PATH_POST_TITLE,
              public_id: `post-title-image-${post.id}`
            })
            .then(result => {
              post.titleImage = result
              post.save()
              res.json(post)
            })
        } else if (titleImage === 'deleted') {
          cloudinary.v2.uploader.destroy(post.titleImage.public_id).then((result, error) => {
            if (error) {
              console.log(error) // eslint-disable-line no-console
            } else {
              post.titleImage = {}
              post.save()
              res.json(post)
            }
          })
        } else {
          res.json(post)
        }
      })
      .catch(err => console.log(err)) // eslint-disable-line no-console
  }
)

// Delete Post
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ refPost: deletedPost._id })
    await SubComment.deleteMany({ refPost: deletedPost._id })

    if (deletedPost.titleImage) {
      cloudinary.v2.uploader.destroy(deletedPost.titleImage.public_id).then((result, error) => {
        error ? console.log(error) : console.log('Media on cloudinary successful deleted') // eslint-disable-line no-console
      })
    }

    res.json({ success: true })
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
  }
})

// Toggle Post Likes
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .populate('user', ['name', 'username', 'avatar'])
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        post.save().then(post => res.json(post))
      } else if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        post.likes.unshift({ user: req.user.id })

        post.save().then(post => res.json(post))
      }
    })
    .catch(() => res.status(404).json({ postnotfound: 'Keinen Beitrag gefunden' }))
})

// Toggle Post Bookmarks
router.post('/bookmark/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .populate('user', ['name', 'username', 'avatar'])
    .then(post => {
      if (post.bookmarks.filter(bookmark => bookmark.user.toString() === req.user.id).length > 0) {
        const removeIndex = post.bookmarks.map(item => item.user.toString()).indexOf(req.user.id)

        post.bookmarks.splice(removeIndex, 1)

        post.save().then(post => res.json(post))
      } else if (post.bookmarks.filter(like => like.user.toString() === req.user.id).length === 0) {
        post.bookmarks.unshift({ user: req.user.id })

        post.save().then(post => res.json(post))
      }
    })
    .catch(() => res.status(404).json({ postnotfound: 'Keinen Beitrag gefunden' }))
})

module.exports = router
