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
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

function CommentFeedItemVote({ comment, handleIsCommentForm }) {
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
    .includes(currentUser._id)
  const isUpvoted = commentData.votes.upvotes.map(upvote => upvote.user).includes(currentUser._id)

  return (
    <Grid container alignItems="center" justify="space-between" spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <IconButton size="small">
            <ThumbDownIcon
              onClick={onDownvoteClick}
              color={isDownvoted ? 'secondary' : 'disabled'}
            />
          </IconButton>
          <IconButton size="small">
            <ThumbUpIcon onClick={onUpvoteClick} color={isUpvoted ? 'secondary' : 'disabled'} />
          </IconButton>
          <Typography variant="subtitle2" color="textSecondary">
            <Box ml={2}>{votes}</Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            isAuthenticated
              ? handleIsCommentForm()
              : dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
          }}
        >
          Reply
        </Button>
      </Grid>
    </Grid>
  )
}

CommentFeedItemVote.propTypes = {
  comment: PropTypes.object.isRequired,
  handleIsCommentForm: PropTypes.func.isRequired
}

export default CommentFeedItemVote
