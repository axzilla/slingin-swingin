// Packages// Packages
const Scraper = require('images-scraper')

// Models
const Post = require('../../models/Post')
const User = require('../../models/User')
const Place = require('../../models/Place')

// Validation
const validatePost = require('../../validation/validatePost')

// Utils
const slugify = require('../../utils/slugify')
const isEmpty = require('../../utils/isEmpty')
const cloudinary = require('../../utils/cloudinary')

// Nodemailer
const sendPostCreate = require('../../nodemailer/templates/sendPostCreate')

const transporter = require('../../nodemailer/transporter')

async function postCreate(req, res) {
  try {
    const { errors } = await validatePost(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const createdPost = await createPost(req)

    if (req.file) {
      await uploadFile(req, res, createdPost)
    } else {
      res.json(createdPost)
    }

    await updateUser(req, createdPost)
    await sendMails(createdPost)
  } catch (error) {
    if (error) throw error
  }
}

async function createPost(req) {
  const { title, contentRaw, contentHtml, contentText, contentMarkdown, type, tags } = req.body
  let location = !isEmpty(JSON.parse(req.body.location)) ? JSON.parse(req.body.location) : null
  const { user } = req

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

  return await Post.create({
    urlSlug: slugify(title),
    user: user._id,
    title,
    contentRaw,
    contentHtml,
    contentText,
    contentMarkdown,
    type,
    tags: tags ? tags.split(',') : [],
    location
  })
}

async function uploadFile(req, res, createdPost) {
  const { mimetype, buffer } = req.file
  const file = `data:${mimetype};base64,${buffer.toString('base64')}`

  const uploadedFile = await cloudinary.v2.uploader.upload(file, {
    folder: process.env.CLOUDINARY_PATH_POST_TITLE,
    public_id: `post-title-image-${createdPost._id}`
  })

  console.log('Titleimage uploaded') // eslint-disable-line no-console
  createdPost.titleImage = uploadedFile // eslint-disable-line
  const savedPost = await createdPost.save()
  res.json(savedPost)
}

async function updateUser(req, createdPost) {
  await User.findByIdAndUpdate(req.user._id, { $push: { posts: createdPost._id } })
}

async function sendMails(createdPost) {
  // Send Mail to User - New POST - If onNewPost
  const foundUsers = await User.find()

  foundUsers
    .filter(user => user.notifications.onNewPost)
    .map(user => sendPostCreate(transporter, createdPost, user))
}

module.exports = postCreate
