const Post = require('../../models/Post')

async function getPostsByTag(req, res) {
  try {
    const foundPost = await Post.find({ hashtags: req.params.tag })
      .sort({ dateCreated: -1 })
      .populate('user', '-password')
      .populate('mediaFiles')

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostsByTag
