const SubComment = require('../../models/SubComment')

async function getSubCommentsByUserId(req, res) {
  try {
    const foundSubComments = await SubComment.find({ user: req.params.userId })
      .populate('user')
      .populate('refPost', ['title', 'shortId', 'urlSlug'])

    res.json(foundSubComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getSubCommentsByUserId
