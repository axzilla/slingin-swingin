const Post = require('../../models/Post')

async function postToggleBookmarks(req, res) {
  try {
    const foundPost = await Post.findById(req.body.postId).populate('user', [
      'name',
      'username',
      'avatar'
    ])

    if (
      foundPost.bookmarks.filter(bookmark => bookmark.user.toString() === req.user.id).length > 0
    ) {
      const removeIndex = foundPost.bookmarks.map(item => item.user.toString()).indexOf(req.user.id)
      foundPost.bookmarks.splice(removeIndex, 1)
      const savedPost = await foundPost
      res.json(savedPost)
    } else if (
      foundPost.bookmarks.filter(like => like.user.toString() === req.user.id).length === 0
    ) {
      foundPost.bookmarks.unshift({ user: req.user.id })
      const savedPost = await foundPost.save()
      res.json(savedPost)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = postToggleBookmarks
