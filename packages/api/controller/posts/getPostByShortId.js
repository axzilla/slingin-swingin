const Post = require('../../models/Post')

async function getPostByShortId(req, res) {
  try {
    const foundPost = await Post.findOne({ shortId: req.params.shortId }).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostByShortId
