const Post = require('../../models/Post')

async function getPostsByTag(req, res) {
  try {
    const foundPost = await Post.find({ tags: req.params.tag })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostsByTag
