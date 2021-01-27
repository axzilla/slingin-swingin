const PostComment = require('../../models/PostComment')

async function commentUpdate(req, res) {
  try {
    const { commentId, contentRaw, contentHtml, contentText, contentMarkdown } = req.body

    const updatedComment = await PostComment.findById(commentId).populate('user', '-password')

    updatedComment.contentRaw = contentRaw
    updatedComment.contentHtml = contentHtml
    updatedComment.contentText = contentText
    updatedComment.contentMarkdown = contentMarkdown
    updatedComment.dateUpdated = Date.now()
    updatedComment.save()

    res.json(updatedComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentUpdate
