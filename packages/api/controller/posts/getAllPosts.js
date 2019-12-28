const Post = require('../../models/Post')

async function getAllPosts(req, res) {
  try {
    const foundPosts = await Post.find()
      .populate('user', ['name', 'username', 'avatar'])
      .sort({ isPinned: -1 })
      .sort({ dateCreated: -1 })

    res.json(foundPosts)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getAllPosts
