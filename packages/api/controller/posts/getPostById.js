const Post = require('../../models/Post')

async function getPostById(req, res) {
  try {
    const foundPost = await Post.findById(req.params.postId).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostById
