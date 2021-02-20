const Post = require('../../models/Post')

async function getPostsByPlaceId(req, res) {
  try {
    const foundPosts = await Post.find({ place: req.params.placeId })
      .populate('user', '-password')
      .populate('place')
      .populate('mediaFiles')

    res.json(foundPosts)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPostsByPlaceId
