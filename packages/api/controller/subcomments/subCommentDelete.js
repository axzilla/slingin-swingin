const SubComment = require('../../models/SubComment')

async function subCommentDelete(req, res) {
  try {
    const deletedSubcomment = await SubComment.findByIdAndDelete(req.body.subCommentId)
    res.json(deletedSubcomment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = subCommentDelete
