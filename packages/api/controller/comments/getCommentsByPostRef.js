const Comment = require('../../models/Comment')

async function getCommentsByPostRef(req, res) {
  try {
    const { refPost } = req.params

    const foundComments = await Comment.find({ refPost })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getCommentsByPostRef
