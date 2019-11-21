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

const validatePost = require('../validation/validatePost')

const mtuPostNew = require('../nodemailer/templates/mtuPostNew')

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const foundPosts = await Post.find()
      .populate('user', ['name', 'username', 'avatar'])
      .sort({ isPinned: -1 })
      .sort({ dateCreated: -1 })

    res.json(foundPosts)
  } catch (error) {
    if (error) throw error
  }
})

// Get Posts By User ID
router.get('/getPosts/published/userId/:id', async (req, res) => {
  try {
    const foundPost = await Post.find({ user: req.params.id })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
})

// Get Posts By User Bookmarks
router.get('/getposts/bookmark/:user_id', async (req, res) => {
  try {
    const foundPosts = Post.find({ 'bookmarks.user': req.params.user_id })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundPosts)
  } catch (error) {
    if (error) throw error
  }
})

// Get Posts By Tag
router.get('/getposts/tag/:tag', async (req, res) => {
  try {
    const foundPost = await Post.find({ tags: req.params.tag })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
})

// Get All Posts Tag Once With Count
router.get('/getAllTags', async (req, res) => {
  try {
    await Post.distinct('tags')

    const foundPostTags = await Post.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } }
    ]).sort({ count: -1 })

    res.json(foundPostTags)
  } catch (error) {
    if (error) throw error
  }
})

// Get Post By ID
router.get('/get-post/:postId', async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.postId).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
})

// Get Post By Short ID
router.get('/short/:post_id', async (req, res) => {
  try {
    const foundPost = await Post.findOne({ shortId: req.params.post_id }).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
})

// Create Post
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  upload.single('titleImage'),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePost(req.body)

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

      const createdPost = await Post.create(postFields)

      if (req.file) {
        const { mimetype, buffer } = req.file
        const file = `data:${mimetype};base64,${buffer.toString('base64')}`

        const uploadedFile = await cloudinary.v2.uploader.upload(file, {
          folder: process.env.CLOUDINARY_PATH_POST_TITLE,
          public_id: `post-title-image-${createdPost.id}`
        })

        console.log('Avatar uploaded') // eslint-disable-line no-console
        createdPost.titleImage = uploadedFile // eslint-disable-line
        const savedPost = await createdPost.save()
        res.json(savedPost)
      } else {
        res.json(createdPost)
      }

      // Send Mail to User - New POST - If onNewPost
      const foundUsers = await User.find()

      foundUsers
        .filter(user => {
          return user.notifications.onNewPost
        })
        .map(user => {
          mtuPostNew(createdPost, user)
        })
    } catch (error) {
      if (error) throw error
    }
  }
)

// Edit Post
router.post(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  upload.single('titleImage'),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePost(req.body)

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

      const foundPost = await Post.findByIdAndUpdate(req.body.id, postFields).populate(
        'bookmarks.user',
        ['email', 'username']
      )

      if (req.file) {
        const { mimetype, buffer } = req.file
        const file = `data:${mimetype};base64,${buffer.toString('base64')}`
        const uploadedFile = await cloudinary.v2.uploader.upload(file, {
          folder: process.env.CLOUDINARY_PATH_POST_TITLE,
          public_id: `post-title-image-${foundPost.id}`
        })

        foundPost.titleImage = uploadedFile // eslint-disable-line
        foundPost.save()
        res.json(foundPost)
      } else if (titleImage === 'deleted') {
        await cloudinary.v2.uploader.destroy(foundPost.titleImage.public_id)

        foundPost.titleImage = {}
        foundPost.save()
        res.json(foundPost)
      } else {
        res.json(foundPost)
      }
    } catch (error) {
      if (error) throw error
    }
  }
)

// Delete Post
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ refPost: deletedPost._id })
    await SubComment.deleteMany({ refPost: deletedPost._id })

    if (deletedPost.titleImage) {
      cloudinary.v2.uploader.destroy(deletedPost.titleImage.public_id)
      console.log('Media on cloudinary successful deleted') // eslint-disable-line no-console
    }

    res.json({ success: true })
  } catch (error) {
    if (error) throw error
  }
})

// Toggle Post Likes
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      const removeIndex = foundPost.likes.map(item => item.user.toString()).indexOf(req.user.id)
      foundPost.likes.splice(removeIndex, 1)
      const savedPost = await foundPost.save()
      res.json(savedPost)
    } else if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      foundPost.likes.unshift({ user: req.user.id })
      const savedPost = await foundPost.save()
      res.json(savedPost)
    }
  } catch (error) {
    if (error) throw error
  }
})

// Toggle Post Bookmarks
router.post('/bookmark/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const foundPost = Post.findById(req.params.id).populate('user', ['name', 'username', 'avatar'])

    if (
      foundPost.bookmarks.filter(bookmark => bookmark.user.toString() === req.user.id).length > 0
    ) {
      const removeIndex = foundPost.bookmarks.map(item => item.user.toString()).indexOf(req.user.id)
      foundPost.bookmarks.splice(removeIndex, 1)
      const savedPost = await foundPost
      res.json(savedPost)
    } else if (
      foundPost.bookmarks.filter(like => like.user.toString() === req.user.id).length === 0
    ) {
      foundPost.bookmarks.unshift({ user: req.user.id })
      const savedPost = await foundPost.save()
      res.json(savedPost)
    }
  } catch (error) {
    if (error) throw error
  }
})

module.exports = router
