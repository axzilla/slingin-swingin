import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '../../../components/TextField'
import AuthContext from '../../../contexts/AuthContext'
import { commentUpvote, commentDownvote, commentCreate } from '../../../services/comment'

import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, Button } from '@material-ui/core'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const useStyles = makeStyles(theme => ({
  button: { padding: theme.spacing(1.5) }
}))

function CommentFeedItemVote({ comment }) {
  const { user } = useContext(AuthContext)
  const classes = useStyles()
  const [commentData, setCommentData] = useState(comment)
  const [isReplyShown, setIsReplyShown] = useState(false)
  const [replyText, setReplyText] = useState('')

  function handleIsReplyShown() {
    setIsReplyShown(!isReplyShown)
  }

  function handleReplyChange(event) {
    setReplyText(event.target.value)
  }

  async function handleReplyCreate() {
    try {
      event.preventDefault()

      const commentData = {
        text: replyText,
        commentId: comment._id,
        postId: comment.post
      }

      await commentCreate(commentData)
    } catch (error) {
      // setErrors(error.response.data)
    }
  }

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
          <Button onClick={onDownvoteClick} className={classes.button}>
            <ThumbDownIcon color={isDownvoted ? 'secondary' : 'primary'} />
          </Button>
          <Typography>{votes}</Typography>
          <Button onClick={onUpvoteClick} className={classes.button}>
            <ThumbUpIcon color={isUpvoted ? 'secondary' : 'primary'} />
          </Button>
          <Button onClick={handleIsReplyShown}>Reply</Button>
        </Grid>
      </Grid>

      {isReplyShown && (
        <>
          <TextField
            onChange={handleReplyChange}
            label="Leave a comment"
            placeholder="Leave a comment"
            value={replyText}
          />
          <Button onClick={handleReplyCreate}>Create Comment</Button>
        </>
      )}
    </Grid>
  )
}

CommentFeedItemVote.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemVote
