const Post = require('../../models/Post')

async function getAllPostsTags(req, res) {
  try {
    await Post.distinct('tags')

    const foundPostTags = await Post.aggregate([
      { $unwind: '$hashtags' },
      { $group: { _id: '$hashtags', count: { $sum: 1 } } }
    ]).sort({ count: -1 })

    res.json(foundPostTags)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getAllPostsTags
