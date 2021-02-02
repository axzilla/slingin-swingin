const Post = require('../../models/Post')

async function getPostById(req, res) {
  try {
    const foundPost = await Post.findById(req.params.postId)
      .populate('user', '-password')
      .populate('location')

    if (!foundPost) {
      return res.status(404).json('404')
    }

    foundPost.views = foundPost.views + 1
    foundPost.save()

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostById
