const PostComment = require('../../models/PostComment')
const Post = require('../../models/Post')
const User = require('../../models/User')

async function commentDelete(req, res) {
  try {
    const deletedComment = await PostComment.findByIdAndDelete(req.body.commentId)

    await updatePost(deletedComment)
    await updateUser(req, deletedComment)

    res.json(deletedComment)
  } catch (error) {
    if (error) throw error
  }
}

async function updatePost(deletedComment) {
  await Post.findByIdAndUpdate(deletedComment.post, { $pull: { postComments: deletedComment._id } })
}

async function updateUser(req, deletedComment) {
  await User.findByIdAndUpdate(req.user._id, { $pull: { postComments: deletedComment._id } })
}

module.exports = commentDelete
