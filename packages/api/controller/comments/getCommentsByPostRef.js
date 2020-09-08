const PostComment = require('../../models/PostComment')

async function getCommentsByPostRef(req, res) {
  try {
    const { post } = req.params

    const foundComments = await PostComment.find({ post })
      .sort({ dateCreated: -1 })
      .populate('user', '-password')

    res.json(foundComments)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getCommentsByPostRef
