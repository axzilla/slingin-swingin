const PostComment = require('../../models/PostComment')

async function commentUpdate(req, res) {
  try {
    const { commentId, content } = req.body

    const updatedComment = await PostComment.findById(commentId).populate('user', '-password')

    updatedComment.content = content
    updatedComment.dateUpdated = Date.now()
    updatedComment.save()

    res.json(updatedComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentUpdate
