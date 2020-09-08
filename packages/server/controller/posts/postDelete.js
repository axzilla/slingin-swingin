const Post = require('../../models/Post')
const User = require('../../models/User')
const PostComment = require('../../models/PostComment')
const cloudinary = require('../../utils/cloudinary')

async function postDelete(req, res) {
  try {
    const deletedPost = await deletePost(req)
    const deletedPostComments = await deletePostComments(deletedPost)

    await deletePostOnUser(req, deletedPost)
    await deletePostCommentsOnUser(req, deletedPostComments)
    res.json({ success: true })
  } catch (error) {
    if (error) throw error
  }
}

async function deletePost(req) {
  const deletedPost = await Post.findByIdAndDelete(req.body.postId)

  if (deletedPost.titleImage) {
    cloudinary.v2.uploader.destroy(deletedPost.titleImage.public_id)
  }

  return deletedPost
}

async function deletePostComments(deletedPost) {
  const foundPostComments = await PostComment.find({ post: deletedPost._id })
  await PostComment.deleteMany({ post: deletedPost._id })
  return foundPostComments
}

async function deletePostOnUser(req, deletedPost) {
  await User.findByIdAndUpdate(req.user._id, { $pull: { posts: deletedPost._id } })
}

async function deletePostCommentsOnUser(req, deletedPostComments) {
  const deletedPostCommentsIds = deletedPostComments.map(item => item.id)

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { postComments: { $in: deletedPostCommentsIds } }
  })
}

module.exports = postDelete
