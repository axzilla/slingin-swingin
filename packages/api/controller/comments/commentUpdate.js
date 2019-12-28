const Comment = require('../../models/Comment')

async function commentUpdate(req, res) {
  try {
    const { commentId, text } = req.body

    const updatedComment = await Comment.findById(commentId).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    updatedComment.text = text
    updatedComment.save()

    res.json(updatedComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentUpdate
