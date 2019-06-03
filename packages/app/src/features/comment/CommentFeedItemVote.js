// Packages
import React from 'react'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { upvoteComment, downvoteComment } from './_services'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Grid, Typography, Button } from '@material-ui/core'

// Material Colors
import { red, green } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  iconContainer: {
    marginRight: '50px',
    marginLeft: '-10px'
  },
  icon: {
    margin: '5px 0 5px'
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

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
    <Grid container justify="flex-start">
      <Grid item>
        <Grid container alignItems="center">
          <Button onClick={onUpvoteClick} className={classes.button}>
            <i
              class="fas fa-heart fa-lg"
              style={{ color: isUpvoted ? red[400] : null }}
            />
          </Button>
          <Typography>{votes}</Typography>
          <Button onClick={onDownvoteClick} className={classes.button}>
            <i
              class="fas fa-poop fa-lg"
              style={{ color: isDownvoted ? red[400] : null }}
            />
          </Button>
        </Grid>
      </Grid>
    </Grid>
    // </Grid>
  )
}

export default CommentFeedItemVote
