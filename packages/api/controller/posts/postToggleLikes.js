const Post = require('../../models/Post')

async function postToggleLikes(req, res) {
  try {
    const foundPost = await Post.findById(req.body.postId).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      const removeIndex = foundPost.likes.map(item => item.user.toString()).indexOf(req.user.id)
      foundPost.likes.splice(removeIndex, 1)
      const savedPost = await foundPost.save()
      res.json(savedPost)
    } else if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      foundPost.likes.unshift({ user: req.user.id })
      const savedPost = await foundPost.save()
      res.json(savedPost)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = postToggleLikes
