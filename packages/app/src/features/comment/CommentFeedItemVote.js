// Packages
import React from 'react'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { upvoteComment, downvoteComment } from './_services'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid, Typography } from '@material-ui/core'

// Material Colors
import { red, green } from '@material-ui/core/colors'

const useStyles = makeStyles({
  iconContainer: {
    marginRight: '50px',
    marginLeft: '-10px'
  },
  icon: {
    margin: '5px 0 5px'
  }
})

const CommentFeedItemVote = ({
  comment,
  commentsByPostRef,
  setCommentsByPostRef
}) => {
  const { auth } = useAuth()
  const classes = useStyles()

  const onUpvoteClick = () => {
    upvoteComment(comment._id).then(res => {
      const upvotedComment = res.data

      const index = commentsByPostRef.indexOf(
        commentsByPostRef.filter(comment => {
          return comment._id === upvotedComment._id
        })[0]
      )

      setCommentsByPostRef([
        ...commentsByPostRef.slice(0, index),
        upvotedComment,
        ...commentsByPostRef.slice(index + 1)
      ])
    })
  }

  const onDownvoteClick = () => {
    downvoteComment(comment._id).then(res => {
      const downvotedComment = res.data

      const index = commentsByPostRef.indexOf(
        commentsByPostRef.filter(comment => {
          return comment._id === downvotedComment._id
        })[0]
      )

      setCommentsByPostRef([
        ...commentsByPostRef.slice(0, index),
        downvotedComment,
        ...commentsByPostRef.slice(index + 1)
      ])
    })
  }

  const upvotes = comment.votes.upvotes.length
  const downvotes = comment.votes.downvotes.length
  const votes = upvotes - downvotes

  const isDownvoted = comment.votes.downvotes
    .map(downvote => downvote.user)
    .includes(auth.user.id)

  const isUpvoted = comment.votes.upvotes
    .map(upvote => upvote.user)
    .includes(auth.user.id)

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.iconContainer}
    >
      <i
        className={`fas fa-caret-square-up fa-lg ${classes.icon}`}
        onClick={() => onUpvoteClick()}
        style={{ color: isUpvoted ? green[400] : null }}
      />
      <Typography>{votes} </Typography>
      <i
        className={`fas fa-caret-square-down fa-lg ${classes.icon}`}
        onClick={() => onDownvoteClick()}
        style={{ color: isDownvoted ? red[400] : null }}
      />
    </Grid>
  )
}

export default CommentFeedItemVote
