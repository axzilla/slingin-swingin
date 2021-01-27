// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { authModalReducer } from '@slices/authSlice'

// Services
import { commentUpvote, commentDownvote } from '@services/comment'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'

function CommentFeedItemVote({ comment }) {
  const dispatch = useDispatch()
  const [commentData, setCommentData] = useState(comment)
  const { isAuthenticated, currentUser } = useSelector(state => state.auth)

  async function onUpvoteClick() {
    try {
      if (isAuthenticated) {
        const upvotedComment = await commentUpvote(commentData._id)
        setCommentData(upvotedComment.data)
      } else {
        dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
      }
    } catch (error) {
      if (error) throw error
    }
  }

  async function onDownvoteClick() {
    try {
      if (isAuthenticated) {
        const downvotedComment = await commentDownvote(commentData._id)
        setCommentData(downvotedComment.data)
      } else {
        dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
      }
    } catch (error) {
      if (error) throw error
    }
  }

  const upvotes = commentData.votes.upvotes.length
  const downvotes = commentData.votes.downvotes.length
  const votes = upvotes - downvotes
  const isDownvoted = commentData.votes.downvotes
    .map(downvote => downvote.user)
    .includes(currentUser.id)
  const isUpvoted = commentData.votes.upvotes.map(upvote => upvote.user).includes(currentUser.id)

  return (
    <Grid container alignItems="center" justify="space-between" spacing={2}>
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary">
          {votes} Votes
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <MoodBadIcon onClick={onDownvoteClick} color={isDownvoted ? 'secondary' : 'disabled'} />
          </Grid>
          <Grid item>
            <MoodIcon onClick={onUpvoteClick} color={isUpvoted ? 'secondary' : 'disabled'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

CommentFeedItemVote.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemVote
