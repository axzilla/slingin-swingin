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
import { Card, CardContent, CardActions, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

function CommentFeedItem({ width, post, postComment, postComments }) {
  const classes = useStyles()
  const [commentData, setCommentData] = useState(postComment)
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
      const commentData = { text, commentId: postComment._id, post: postComment.post }
      setIsEditMode(false)
      const updatedComment = await commentUpdate(commentData)
      setCommentData(updatedComment.data)
    } catch (error) {
      if (error) throw error
    }
  }

  // async function onDeleteClick(commentId) {
  //   try {
  //     if (window.confirm('Kommentar löschen?')) {
  //       const deletedComment = await commentDelete(commentId)

  //       const index = commentsByPostRef.indexOf(
  //         commentsByPostRef.filter(comment => {
  //           return comment._id === deletedComment.data._id
  //         })[0]
  //       )

  //       setCommentsByPostRef([
  //         ...commentsByPostRef.slice(0, index),
  //         ...commentsByPostRef.slice(index + 1)
  //       ])
  //     }
  //   } catch (error) {
  //     if (error) throw error
  //   }
  // }

  return (
    <Card className={classes.card} style={{ width: width ? width : '100%' }}>
      {!isEditMode ? (
        <>
          <CommentFeedItemHeader comment={postComment} handleMenuClick={handleMenuClick} />

          {/* <CommentFeedItemMenu
            comment={comment}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            anchorEl={anchorEl}
          /> */}

          <CardContent>
            <CommentFeedItemText comment={postComment} />
          </CardContent>
        </>
      ) : (
        <CardContent>
          <CommentEdit comment={postComment} onSaveClick={onSaveClick} />
        </CardContent>
      )}
      <Divider />

      <CardActions disableSpacing>
        <CommentFeedItemVote
          comment={postComment}
          // commentsByPostRef={commentsByPostRef}
          // setCommentsByPostRef={setCommentsByPostRef}
        />
      </CardActions>

      <Divider />
    </Card>
  )
}

CommentFeedItem.propTypes = {
  post: PropTypes.object,
  postComment: PropTypes.object,
  commentsByPostRef: PropTypes.array,
  setCommentsByPostRef: PropTypes.func
}

export default CommentFeedItem
