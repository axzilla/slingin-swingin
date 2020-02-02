import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { commentUpdate, commentDelete } from '../../../services/comment'
import AuthContext from '../../../contexts/AuthContext'

import { CommentEdit, CommentFeedItemHeader, CommentFeedItemText, CommentFeedItemVote } from './'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({ card: { marginBottom: '20px' } })

function CommentFeedItem({ comment, comments, setComments }) {
  const { user, isAuthenticated } = useContext(AuthContext)

  const classes = useStyles()
  const [commentData, setCommentData] = useState(comment)
  const [isEditMode, setIsEditMode] = useState(false)

  const onEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  async function onSaveClick(text) {
    try {
      const commentData = { text, commentId: comment._id, post: comment.post }
      setIsEditMode(false)
      const updatedComment = await commentUpdate(commentData)
      setCommentData(updatedComment.data)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onDeleteClick(commentId) {
    try {
      if (window.confirm('Delete comment?')) {
        const deletedComment = await commentDelete(commentId)

        const index = comments.indexOf(
          comments.filter(comment => {
            return comment._id === deletedComment.data._id
          })[0]
        )

        setComments([...comments.slice(0, index), ...comments.slice(index + 1)])
      }
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Card className={classes.card}>
      {!isEditMode ? (
        <>
          <CommentFeedItemHeader comment={comment} />
          <CardContent>
            <CommentFeedItemText comment={commentData} />
          </CardContent>
        </>
      ) : (
        <CardContent>
          <CommentEdit comment={commentData} onSaveClick={onSaveClick} />
        </CardContent>
      )}
      <Divider />
      <CardActions disableSpacing>
        <CommentFeedItemVote comment={commentData} />
      </CardActions>
      {isAuthenticated && user.id === comment.user._id && (
        <>
          <Divider />
          <CardActions disableSpacing>
            <Grid container>
              <Button onClick={onEditClick}>Edit</Button>
              <Button onClick={onDeleteClick}>Delete</Button>
            </Grid>
          </CardActions>
        </>
      )}
    </Card>
  )
}

CommentFeedItem.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentFeedItem
