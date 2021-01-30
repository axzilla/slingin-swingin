const PostComment = require('../../models/PostComment')

async function commentUpvote(req, res) {
  try {
    const foundComment = await PostComment.findById(req.params.commentId).populate(
      'user',
      '-password'
    )

    if (
      foundComment.votes.upvotes.filter(upvote => {
        return upvote.user.toString() === req.user._id
      }).length > 0
    ) {
      const removeIndex = foundComment.votes.upvotes
        .map(item => item.user.toString())
        .indexOf(req.user._id)

      foundComment.votes.upvotes.splice(removeIndex, 1)
      const savedComment = await foundComment.save()

      res.json(savedComment)
    } else if (
      foundComment.votes.upvotes.filter(upvote => {
        upvote.user.toString() === req.user._id
      }).length === 0
    ) {
      if (
        foundComment.votes.downvotes.filter(downvote => downvote.user.toString() === req.user._id)
          .length > 0
      ) {
        const downvoteRemoveIndex = foundComment.votes.downvotes
          .map(downvote => downvote.user.toString())
          .indexOf(req.user._id)

        foundComment.votes.downvotes.splice(downvoteRemoveIndex, 1)
      }

      foundComment.votes.upvotes.unshift({ user: req.user._id })
      const savedComment = await foundComment.save()

      res.json(savedComment)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = commentUpvote
