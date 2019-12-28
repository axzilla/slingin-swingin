const SubComment = require('../../models/SubComment')

async function getSubCommentsByPostRef(req, res) {
  try {
    const foundSubComments = await SubComment.find({ refPost: req.params.postId }).populate('user')
    res.json(foundSubComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getSubCommentsByPostRef
