const PostComment = require('../../models/PostComment')

async function getCommentsByUserId(req, res) {
  try {
    const foundComments = await PostComment.find({ user: req.params.userId })
      .sort({ dateCreated: -1 })
      .populate('user', '-password')
      .populate('post')

    res.json(foundComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getCommentsByUserId
