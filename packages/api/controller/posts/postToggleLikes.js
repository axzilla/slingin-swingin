const Post = require('../../models/Post')

async function postToggleLikes(req, res) {
  try {
    const foundPost = await Post.findById(req.body.postId)
      .populate('user', '-password')
      .populate('mediaFiles')

    const isLiked = foundPost.likes.includes(req.user._id)

    if (isLiked) {
      unLike(req, res, foundPost)
    } else if (!isLiked) {
      like(req, res, foundPost)
    }
  } catch (error) {
    if (error) throw error
  }
}

async function unLike(req, res, foundPost) {
  const removeIndex = foundPost.likes.indexOf(req.user._id)
  foundPost.likes.splice(removeIndex, 1)
  const savedPost = await foundPost.save()
  res.json(savedPost)
}

async function like(req, res, foundPost) {
  foundPost.likes.unshift(req.user._id)
  const savedPost = await foundPost.save()
  res.json(savedPost)
}

module.exports = postToggleLikes
