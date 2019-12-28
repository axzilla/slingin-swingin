const SubComment = require('../../models/SubComment')

async function getSubCommentsByCommentRef(req, res) {
  try {
    const foundSubComments = await SubComment.find({ refComment: req.params.commentId }).populate(
      'user'
    )

    res.json(foundSubComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getSubCommentsByCommentRef
