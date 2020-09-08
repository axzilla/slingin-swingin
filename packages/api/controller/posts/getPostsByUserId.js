const Post = require('../../models/Post')

async function getPostsByUserId(req, res) {
  try {
    const foundPost = await Post.find({ user: req.params.userId })
      .sort({ dateCreated: -1 })
      .populate('user', '-password')

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostsByUserId
