const SubComment = require('../../models/SubComment')

async function subCommentCreate(req, res) {
  try {
    const { text, refPost, refComment } = req.body
    const { id } = req.user

    const newSubComment = {
      text,
      refPost,
      refComment,
      user: id
    }

    const createdSubComment = await SubComment.create(newSubComment)
    const foundSubComment = await SubComment.findById(createdSubComment._id).populate('user')
    res.json(foundSubComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = subCommentCreate
