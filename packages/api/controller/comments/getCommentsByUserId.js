const Comment = require('../../models/Comment')

async function getCommentsByUserId(req, res) {
  try {
    const foundComments = await Comment.find({ user: req.params.userId })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])
      .populate('refPost', ['title', 'shortId', 'urlSlug'])

    res.json(foundComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getCommentsByUserId
