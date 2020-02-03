import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '@contexts/AuthContext'
import { commentUpvote, commentDownvote } from '@services/comment'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

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
    <Grid container justify="center">
      <Grid item>
        <Grid container alignItems="center">
          <IconButton onClick={onDownvoteClick}>
            <ThumbDownIcon color={isDownvoted ? 'secondary' : 'primary'} />
          </IconButton>
          <Typography>{votes}</Typography>
          <IconButton onClick={onUpvoteClick}>
            <ThumbUpIcon color={isUpvoted ? 'secondary' : 'primary'} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

CommentFeedItemVote.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemVote
