const Post = require('../../models/Post')

async function getPostsByUserId(req, res) {
  try {
    const foundPosts = await Post.find({ 'bookmarks.user': req.params.userId })
      .sort({ dateCreated: -1 })
      .populate('user', ['name', 'username', 'avatar'])
    res.json(foundPosts)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostsByUserId
