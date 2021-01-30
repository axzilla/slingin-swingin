const Post = require('../../models/Post')
const validatePost = require('../../validation/validatePost')
const slugify = require('../../utils/slugify')
const isEmpty = require('../../utils/isEmpty')
const cloudinary = require('../../utils/cloudinary')

async function postUpdate(req, res) {
  try {
    const { errors } = validatePost(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const {
      titleImage,
      title,
      contentRaw,
      contentHtml,
      contentText,
      contentMarkdown,
      type,
      tags
    } = req.body
    const postFields = {}

    Object.assign(postFields, {
      urlSlug: slugify(title),
      title,
      contentRaw,
      contentHtml,
      contentText,
      contentMarkdown,
      type,
      tags: tags ? tags.split(',') : [],
      dateUpdated: Date.now()
    })

    const foundPost = await Post.findByIdAndUpdate(req.body._id, postFields).populate('bookmarks', [
      'email',
      'username'
    ])

    if (req.file) {
      const { mimetype, buffer } = req.file
      const file = `data:${mimetype};base64,${buffer.toString('base64')}`
      const uploadedFile = await cloudinary.v2.uploader.upload(file, {
        folder: process.env.CLOUDINARY_PATH_POST_TITLE,
        public_id: `post-title-image-${foundPost._id}`
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

module.exports = postUpdate
