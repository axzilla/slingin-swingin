const Post = require('../../models/Post')
const User = require('../../models/User')
const validatePost = require('../../validation/validatePost')
const slugify = require('../../utils/slugify')
const isEmpty = require('../../utils/isEmpty')
const cloudinary = require('../../utils/cloudinary')
const mtuPostCreate = require('../../nodemailer/templates/mtuPostCreate')

async function postCreate(req, res) {
  try {
    const { errors } = validatePost(req.body)

    if (!isEmpty(errors)) {
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
      .filter(user => user.notifications.onNewPost)
      .map(user => mtuPostCreate(createdPost, user))
  } catch (error) {
    if (error) throw error
  }
}

module.exports = postCreate
