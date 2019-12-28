import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '../../contexts/AuthContext'
import { commentUpvote, commentDownvote } from './_services'

import { makeStyles } from '@material-ui/styles'
import { Grid, Typography, Button } from '@material-ui/core'
import { red, brown } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  icon: {
    margin: '5px 0 5px'
  },
  button: {
    padding: theme.spacing(1.5)
  }
}))

function CommentFeedItemVote({ comment, commentsByPostRef, setCommentsByPostRef }) {
  const { user } = useContext(AuthContext)
  const classes = useStyles()

  async function onUpvoteClick() {
    try {
      const upvotedComment = await commentUpvote(comment._id)

      const index = commentsByPostRef.indexOf(
        commentsByPostRef.filter(comment => {
          return comment._id === upvotedComment.data._id
        })[0]
      )

      setCommentsByPostRef([
        ...commentsByPostRef.slice(0, index),
        upvotedComment.data,
        ...commentsByPostRef.slice(index + 1)
      ])
    } catch (error) {
      if (error) throw error
    }
  }

  async function onDownvoteClick() {
    try {
      const downvotedComment = await commentDownvote(comment._id)

      const index = commentsByPostRef.indexOf(
        commentsByPostRef.filter(comment => {
          return comment._id === downvotedComment.data._id
        })[0]
      )

      setCommentsByPostRef([
        ...commentsByPostRef.slice(0, index),
        downvotedComment.data,
        ...commentsByPostRef.slice(index + 1)
      ])
    } catch (error) {
      if (error) throw error
    }
  }

  const upvotes = comment.votes.upvotes.length
  const downvotes = comment.votes.downvotes.length
  const votes = upvotes - downvotes
  const isDownvoted = comment.votes.downvotes.map(downvote => downvote.user).includes(user.id)
  const isUpvoted = comment.votes.upvotes.map(upvote => upvote.user).includes(user.id)

  return (
    <Grid container justify="center">
      <Grid item>
        <Grid container alignItems="center">
          <Button onClick={onUpvoteClick} className={classes.button}>
            <i className="fas fa-heart fa-lg" style={{ color: isUpvoted ? red[400] : null }} />
          </Button>
          <Typography>{votes}</Typography>
          <Button onClick={onDownvoteClick} className={classes.button}>
            <i className="fas fa-poop fa-lg" style={{ color: isDownvoted ? brown[400] : null }} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

CommentFeedItemVote.propTypes = {
  comment: PropTypes.object,
  commentsByPostRef: PropTypes.array,
  setCommentsByPostRef: PropTypes.func
}

export default CommentFeedItemVote
