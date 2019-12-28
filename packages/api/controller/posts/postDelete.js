const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const SubComment = require('../../models/SubComment')
const cloudinary = require('../../utils/cloudinary')

async function postDelete(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.body.postId)
    await Comment.deleteMany({ refPost: deletedPost._id })
    await SubComment.deleteMany({ refPost: deletedPost._id })

    if (deletedPost.titleImage) {
      cloudinary.v2.uploader.destroy(deletedPost.titleImage.public_id)
    }

    res.json({ success: true })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = postDelete
