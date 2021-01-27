const Post = require('../../models/Post')
const User = require('../../models/User')
const validatePost = require('../../validation/validatePost')
const slugify = require('../../utils/slugify')
const isEmpty = require('../../utils/isEmpty')
const cloudinary = require('../../utils/cloudinary')
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
  const { user } = req
  return await Post.create({
    urlSlug: slugify(title),
    user: user.id,
    title,
    contentRaw,
    contentHtml,
    contentText,
    contentMarkdown,
    type,
    tags: tags ? tags.split(',') : []
  })
}

async function uploadFile(req, res, createdPost) {
  const { mimetype, buffer } = req.file
  const file = `data:${mimetype};base64,${buffer.toString('base64')}`

  const uploadedFile = await cloudinary.v2.uploader.upload(file, {
    folder: process.env.CLOUDINARY_PATH_POST_TITLE,
    public_id: `post-title-image-${createdPost.id}`
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
