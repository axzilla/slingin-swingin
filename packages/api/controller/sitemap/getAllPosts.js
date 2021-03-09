const Post = require('../../models/Post')

async function getAllPosts(req, res) {
  try {
    const foundPosts = await Post.find()
    res.json(foundPosts)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getAllPosts
