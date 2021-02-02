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
    let place = !isEmpty(JSON.parse(req.body.place)) ? JSON.parse(req.body.place) : null
    const postFields = {}

    if (!isEmpty(place)) {
      const foundPlace = await Place.findOne({ 'mapBox.id': place.mapBox.id })
      if (!foundPlace) {
        const google = new Scraper({
          puppeteer: { headless: true, args: ['--no-sandbox'] },
          tbs: { isz: 'l' }
        })

        const photoResults = await google.scrape(place.mapBox.place_name, 2)

        const uploadedPhoto = await cloudinary.v2.uploader.upload(photoResults[0].url, {
          folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
          public_id: `${slugify(place.mapBox.place_name)}`
        })

        const createdPlace = await Place.create({
          mapBox: place.mapBox,
          urlSlug: slugify(place.mapBox.place_name)
        })

        createdPlace.photo = uploadedPhoto
        createdPlace.save()
        place = createdPlace._id
      } else {
        place = foundPlace._id
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
      place,
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
