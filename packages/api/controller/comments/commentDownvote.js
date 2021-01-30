const PostComment = require('../../models/PostComment')

async function commentDownvote(req, res) {
  try {
    const foundComment = await PostComment.findById(req.params.commentId).populate(
      'user',
      '-password'
    )

    if (
      foundComment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user._id)
        .length > 0
    ) {
      const downvoteRemoveIndex = foundComment.votes.downvotes
        .map(downvote => downvote.user.toString())
        .indexOf(req.user._id)

      foundComment.votes.downvotes.splice(downvoteRemoveIndex, 1)

      const savedComment = await foundComment.save()
      res.json(savedComment)
    } else if (
      foundComment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user._id)
        .length === 0
    ) {
      if (
        foundComment.votes.upvotes.filter(upvote => upvote.user.toString() === req.user._id)
          .length > 0
      ) {
        const upvoteRemoveIndex = foundComment.votes.upvotes
          .map(upvote => upvote.user.toString())
          .indexOf(req.user._id)

        foundComment.votes.upvotes.splice(upvoteRemoveIndex, 1)
      }

      foundComment.votes.downvotes.unshift({ user: req.user._id })

      const savedComment = await foundComment.save()
      res.json(savedComment)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentDownvote
