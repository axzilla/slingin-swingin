const SubComment = require('../../models/SubComment')

async function subCommentUpdate(req, res) {
  try {
    const foundSubComment = await SubComment.findById(req.body.subCommentId).populate('user')
    foundSubComment.text = req.body.text
    const savedSubComment = await foundSubComment.save()
    res.json(savedSubComment)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = subCommentUpdate
