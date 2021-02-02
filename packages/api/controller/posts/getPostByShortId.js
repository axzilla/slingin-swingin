const Post = require('../../models/Post')

async function getPostByShortId(req, res) {
  try {
    const foundPost = await Post.findOne({ shortId: req.params.shortId })
      .populate('user', '-password')
      .populate('location')
      .populate({
        path: 'postComments',
        populate: { path: 'user' }
      })

    if (!foundPost) {
      return res.status(404).json('404')
    }

    foundPost.views = foundPost.views + 1
    foundPost.save()

    res.json(foundPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostByShortId
