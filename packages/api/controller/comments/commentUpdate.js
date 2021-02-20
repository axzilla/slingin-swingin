const PostComment = require('../../models/PostComment')

async function commentUpdate(req, res) {
  try {
    const { commentId, contentRaw, contentText, hashtags } = req.body

    const updatedComment = await PostComment.findById(commentId).populate('user', '-password')

    updatedComment.contentRaw = contentRaw
    updatedComment.contentText = contentText
    updatedComment.dateUpdated = Date.now()
    updatedComment.hashtags = hashtags
    updatedComment.save()

    res.json(updatedComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentUpdate
