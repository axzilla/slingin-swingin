import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '@contexts/AuthContext'
import { commentUpvote, commentDownvote } from '@services/comment'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'

function CommentFeedItemVote({ comment }) {
  const { user } = useContext(AuthContext)
  const [commentData, setCommentData] = useState(comment)

  async function onUpvoteClick() {
    try {
      const upvotedComment = await commentUpvote(commentData._id)
      setCommentData(upvotedComment.data)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onDownvoteClick() {
    try {
      const downvotedComment = await commentDownvote(commentData._id)
      setCommentData(downvotedComment.data)
    } catch (error) {
      if (error) throw error
    }
  }

  const upvotes = commentData.votes.upvotes.length
  const downvotes = commentData.votes.downvotes.length
  const votes = upvotes - downvotes
  const isDownvoted = commentData.votes.downvotes.map(downvote => downvote.user).includes(user.id)
  const isUpvoted = commentData.votes.upvotes.map(upvote => upvote.user).includes(user.id)

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <MoodBadIcon onClick={onDownvoteClick} color={isDownvoted ? 'primary' : 'disabled'} />
      </Grid>
      <Grid item>
        <MoodIcon onClick={onUpvoteClick} color={isUpvoted ? 'primary' : 'disabled'} />
      </Grid>
      <Grid item>
        <Typography variant="h6" color="textSecondary">
          {votes} Votes
        </Typography>
      </Grid>
    </Grid>
  )
}

CommentFeedItemVote.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemVote
