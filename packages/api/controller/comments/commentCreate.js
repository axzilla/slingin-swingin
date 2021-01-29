const PostComment = require('../../models/PostComment')
const User = require('../../models/User')
const Post = require('../../models/Post')

const sendCommentCreateIfPostOwner = require('../../nodemailer/templates/sendCommentCreateIfPostOwner')
const sendCommentCreateIfPostBookmarked = require('../../nodemailer/templates/sendCommentCreateIfPostBookmarked')
const sendCommentCreateIfPostCommented = require('../../nodemailer/templates/sendCommentCreateIfPostCommented')

const transporter = require('../../nodemailer/transporter')

async function commentCreate(req, res) {
  try {
    const createdPostComment = await createComment(req)
    await updateUser(req, createdPostComment)
    const updatedPost = await updatePost(req, createdPostComment)
    // await updateComment(req, createdPostComment)
    await sendMails(updatedPost, createdPostComment)
    res.json(createdPostComment)
  } catch (error) {
    if (error) throw error
  }
}

async function createComment(req) {
  const { contentRaw, contentHtml, contentText, contentMarkdown, postId, parentId } = req.body
  const { id } = req.user

  const createdPostComment = await PostComment.create({
    contentRaw,
    contentHtml,
    contentText,
    contentMarkdown,
    post: postId,
    user: id,
    parent: parentId || null
  })

  const populatedPostComment = await PostComment.findById(createdPostComment._id).populate(
    'user',
    '-password'
  )

  return populatedPostComment
}

async function updateUser(req, createdPostComment) {
  await User.findByIdAndUpdate(req.user.id, { $push: { postComments: createdPostComment._id } })
}

async function updatePost(req, createdPostComment) {
  const { postId } = req.body
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { postComments: createdPostComment._id }
    },
    { new: true }
  )
    .populate('user')
    .populate('bookmarks')
    .populate({
      path: 'postComments',
      populate: { path: 'user' }
    })
  return updatedPost
}

// async function updateComment(req, createdPostComment) {
//   if (req.body.commentId) {
//     await PostComment.findByIdAndUpdate(req.body.commentId, {
//       $push: { postComments: createdPostComment._id }
//     })
//   } else {
//     return
//   }
// }

async function sendMails(updatedPost) {
  // For activities of your own post
  if (updatedPost.user.notifications.onOwnPost) {
    sendCommentCreateIfPostOwner(transporter, updatedPost, updatedPost.user)
  }

  // For activities on a bookmarked post
  if (updatedPost.bookmarks.length > 0) {
    updatedPost.bookmarks.map(bookmarkUser => {
      bookmarkUser.notifications.onBookmarkedPost &&
        sendCommentCreateIfPostBookmarked(transporter, updatedPost, bookmarkUser)
    })
  }

  // For posts where I left a comment
  const foundUsers = [
    ...new Set(
      updatedPost.postComments
        .filter(postComment => {
          return postComment.user.notifications.onCommentedPost
        })
        .map(postComments => postComments.user)
    )
  ]

  foundUsers.map(user => {
    sendCommentCreateIfPostCommented(transporter, updatedPost, user)
  })
}

module.exports = commentCreate
