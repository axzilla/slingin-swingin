const Comment = require('../../models/Comment')

async function commentCreate(req, res) {
  try {
    const { text, refPost } = req.body
    const { id } = req.user

    const newComment = {
      text,
      refPost,
      user: id
    }

    const createdComment = await Comment.create(newComment)
    const foundComment = await Comment.findById(createdComment._id).populate('user')
    res.json(foundComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentCreate
