// Packages// Packages
const Scraper = require('images-scraper')

// Models
const Post = require('../../models/Post')
const Place = require('../../models/Place')

// Validation
const validatePost = require('../../validation/validatePost')

// Utils
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
    let location = !isEmpty(JSON.parse(req.body.location)) ? JSON.parse(req.body.location) : null
    const postFields = {}

    if (!isEmpty(location)) {
      const foundLocation = await Place.findOne({ 'mapBox.id': location.mapBox.id })
      if (!foundLocation) {
        const google = new Scraper({
          puppeteer: { headless: true, args: ['--no-sandbox'] },
          tbs: { isz: 'l' }
        })

        const photoResults = await google.scrape(location.mapBox.place_name, 2)

        const uploadedPhoto = await cloudinary.v2.uploader.upload(photoResults[0].url, {
          folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
          public_id: `${slugify(location.mapBox.place_name)}`
        })

        const createdLocation = await Place.create({
          mapBox: location.mapBox,
          urlSlug: slugify(location.mapBox.place_name)
        })

        createdLocation.photo = uploadedPhoto
        createdLocation.save()
        location = createdLocation._id
      } else {
        location = foundLocation._id
      }
    }

    Object.assign(postFields, {
      urlSlug: slugify(title),
      title,
      contentRaw,
      contentHtml,
      contentText,
      contentMarkdown,
      type,
      tags: tags ? tags.split(',') : [],
      location,
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
