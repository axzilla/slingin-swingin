const Post = require('../../models/Post')

async function postToggleBookmarks(req, res) {
  try {
    const foundPost = await Post.findById(req.body.postId).populate('user', '-password')

    const isBookmarked = foundPost.bookmarks.includes(req.user._id)

    if (isBookmarked) {
      unBookmark(req, res, foundPost)
    } else if (!isBookmarked) {
      bookmark(req, res, foundPost)
    }
  } catch (error) {
    if (error) throw error
  }
}

async function unBookmark(req, res, foundPost) {
  const removeIndex = foundPost.bookmarks.indexOf(req.user.id)
  foundPost.bookmarks.splice(removeIndex, 1)
  const savedPost = await foundPost.save()
  res.json(savedPost)
}

async function bookmark(req, res, foundPost) {
  await foundPost.bookmarks.unshift(req.user.id)
  const savedPost = await foundPost.save()
  res.json(savedPost)
}

module.exports = postToggleBookmarks
