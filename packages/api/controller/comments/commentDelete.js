const Comment = require('../../models/Comment')
const SubComment = require('../../models/SubComment')

async function commentDelete(req, res) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.body.commentId)
    await SubComment.deleteMany({ refComment: deletedComment._id })
    res.json(deletedComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentDelete
