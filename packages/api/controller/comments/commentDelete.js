const PostComment = require('../../models/PostComment')
const Post = require('../../models/Post')
const User = require('../../models/User')

async function commentDelete(req, res) {
  try {
    const userId = req.user._id
    const { commentIds, postId } = req.body

    await PostComment.deleteMany({ _id: commentIds })
    await updatePost(commentIds, postId)
    await updateUser(commentIds, userId)
    res.json(commentIds)
  } catch (error) {
    if (error) throw error
  }
}

async function updatePost(deletedComments, postId) {
  await Post.findByIdAndUpdate(postId, { $pull: { postComments: { $in: deletedComments } } })
}

async function updateUser(deletedComments, userId) {
  await User.findByIdAndUpdate(userId, { $pull: { postComments: { $in: deletedComments } } })
}

module.exports = commentDelete
