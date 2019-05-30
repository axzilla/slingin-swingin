const express = require('express')
const router = express.Router()
const passport = require('passport')
const slugify = require('../helpers/slugify')
const keys = require('../config/keys')
const multer = require('multer')
const cloudinary = require('../config/cloudinary')

const upload = multer()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

const validatePostInput = require('../validation/posts')

const mtuPostNew = require('../nodemailer/templates/mtuPostNew')

// @route   GET api/posts
// @desc    Get All Published Posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .populate('user', ['name', 'username', 'avatar'])
    .sort({ isPinned: -1 })
    .sort({ dateCreated: -1 })
    .then(posts => {
      const publishedPosts = posts.filter(post => post.published)
      res.json(publishedPosts)
    })
    .catch(err =>
      res.status(404).json({ nopostsfound: 'Keine Beiträge gefunden' })
    )
})

// @route   GET api/posts/getPosts/published/userId/:id
// @desc    Get Published Posts By User ID
// @access  Public
router.get('/getPosts/published/userId/:id', (req, res) => {
  Post.find({ user: req.params.id })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      const publishedPosts = posts.filter(post => post.published)
      res.json(publishedPosts)
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'Keine Beträge gefunden' })
    )
})

// @route   GET api/posts/getPosts/published/userId/:id
// @desc    Get Draft Posts By User ID
// @access  Public
router.get('/getPosts/draft/userId/:id', (req, res) => {
  Post.find({ user: req.params.id })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      const publishedPosts = posts.filter(post => !post.published)
      res.json(publishedPosts)
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'Keine Beträge gefunden' })
    )
})

// @route   GET api/posts/getposts/bookmark/:user_id
// @desc    Get Published Posts By User Bookmarks
// @access  Public
router.get('/getposts/bookmark/:user_id', (req, res) => {
  Post.find({ 'bookmarks.user': req.params.user_id })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      const publishedPosts = posts.filter(post => post.published)
      res.json(publishedPosts)
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'Keine Beträge gefunden' })
    )
})

// @route   GET api/posts/getposts/tag/:tag
// @desc    Get Published Posts By Tag
// @access  Public
router.get('/getposts/tag/:tag', (req, res) => {
  Post.find({ tags: req.params.tag })
    .sort({ dateCreated: -1 })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      const publishedPosts = posts.filter(post => post.published)
      res.json(publishedPosts)
    })
    .catch(err =>
      res.status(404).json({ nopostfound: 'Keine Beträge gefunden' })
    )
})

// @route   GET api/posts/getAllTags
// @desc    Get All Posts Tag Once With Count
// @access  Public
router.get('/getAllTags', (req, res) => {
  console.log('xxx')
  Post.distinct('tags')
  Post.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } }
  ])
    .sort({ count: -1 })
    .then(tags => res.json(tags))
    .catch(err => res.status(404).json({ notagsfound: 'Keine Tags gefunden' }))
})

// @route   GET api/posts/short/:post_id
// @desc    Get Post By Short ID
// @access  Public
router.get('/short/:post_id', (req, res) => {
  Post.findOne({ shortId: req.params.post_id })
    .populate('user', ['name', 'username', 'avatar'])
    .then(post => {
      res.json(post)
    })
    .catch(err =>
      res
        .status(404)
        .json({ nopostfound: 'Keine Beträge mit dieser ID gefunden' })
    )
})

// @route   POST api/posts/create
// @desc    Create Post
// @access  Private
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  upload.single('titleImage'),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { title, text, type, published, tags } = req.body
    const { user } = req

    const postFields = {}

    Object.assign(postFields, {
      urlSlug: slugify(title),
      user: user.id,
      title,
      text,
      type,
      tags: tags ? tags.split(',') : [],
      published
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
              console.log(err)
            } else {
              console.log('Avatar uploaded')
              post.titleImage = result
              post.save().then(() => {
                res.json(post)
              })
            }
          })
      } else {
        res.json(post)
      }

      if (post.published) {
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
      }
    })
  }
)

// @route   POST api/posts/edit
// @desc    Edit Post
// @access  Private
router.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  upload.single('titleImage'),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const { titleImage, title, text, type, tags, published } = req.body
    const { user } = req
    const postFields = {}

    Object.assign(postFields, {
      urlSlug: slugify(title),
      user: user.id,
      title,
      text,
      type,
      tags: tags ? tags.split(',') : [],
      published,
      dateUpdated: Date.now()
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
            .then((result, error) => {
              post.titleImage = result
              post.save()
              res.json(post)
            })
        } else if (titleImage === 'deleted') {
          cloudinary.v2.uploader
            .destroy(post.titleImage.public_id)
            .then((result, error) => {
              if (error) {
                console.log(error)
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
      .catch(err => console.log(err))
  }
)

// @route   DELETE api/posts/:id
// @desc    Delete Post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notauthorized: 'Du bist hierfür nicht autorisiert' })
        }

        post.remove().then(post => {
          Comment.deleteMany({ refPostId: post.id }, (err, data) => {
            err ? console.log(err) : console.log('All Postdata deleted!')
          })

          if (post.titleImage) {
            cloudinary.v2.uploader
              .destroy(post.titleImage.public_id)
              .then((result, error) => {
                error
                  ? console.log(error)
                  : console.log('Media on cloudinary successful deleted')
              })
          }

          res.json({ success: true })
        })
      })
      .catch(err =>
        res.status(404).json({ postnotfound: 'Keine Beiträge gefunden' })
      )
  }
)

// @route   POST api/posts/like/:id
// @desc    Toggle Post Likes
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .populate('user', ['name', 'username', 'avatar'])
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          post.likes.splice(removeIndex, 1)

          post.save().then(post => res.json(post))
        } else if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          post.likes.unshift({ user: req.user.id })

          post.save().then(post => res.json(post))
        }
      })
      .catch(err =>
        res.status(404).json({ postnotfound: 'Keinen Beitrag gefunden' })
      )
  }
)

// @route   POST api/posts/bookmark/:id
// @desc    Toggle Post Bookmarks
// @access  Private
router.post(
  '/bookmark/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .populate('user', ['name', 'username', 'avatar'])
      .then(post => {
        if (
          post.bookmarks.filter(
            bookmark => bookmark.user.toString() === req.user.id
          ).length > 0
        ) {
          const removeIndex = post.bookmarks
            .map(item => item.user.toString())
            .indexOf(req.user.id)

          post.bookmarks.splice(removeIndex, 1)

          post.save().then(post => res.json(post))
        } else if (
          post.bookmarks.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          post.bookmarks.unshift({ user: req.user.id })

          post.save().then(post => res.json(post))
        }
      })
      .catch(err =>
        res.status(404).json({ postnotfound: 'Keinen Beitrag gefunden' })
      )
  }
)

module.exports = router
