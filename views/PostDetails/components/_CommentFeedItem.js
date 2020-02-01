import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { commentUpdate, commentDelete } from '../../../services/comment'

import {
  CommentEdit,
  CommentFeedItemHeader,
  CommentFeedItemText,
  CommentFeedItemMenu,
  CommentFeedItemVote
} from './'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({ card: { marginBottom: '20px' } })

function CommentFeedItem({ comment, comments, setComments }) {
  const classes = useStyles()
  const [commentData, setCommentData] = useState(comment)
  const [isEditMode, setIsEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

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
          <CommentFeedItemHeader comment={comment} handleMenuClick={handleMenuClick} />
          <CommentFeedItemMenu
            comment={commentData}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            anchorEl={anchorEl}
          />
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
    </Card>
  )
}

CommentFeedItem.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentFeedItem
