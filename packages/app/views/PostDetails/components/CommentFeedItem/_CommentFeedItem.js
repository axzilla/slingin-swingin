// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Services
import { commentDelete } from '@services/comment'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Global Components
import CommentForm from '@components/CommentForm'

// Local Components
import Header from './components/Header'
import Content from './components/Content'
import Vote from './components/Vote'

// MUI
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

function CommentFeedItem({ comment, comments, setComments }) {
  const [commentData, setCommentData] = useState(comment)
  const [isEditMode, setIsEditMode] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [isCommentForm, setIsCommentForm] = useState(false)
  const { setAlert } = useAlert()

  const handleDeleteDialog = () => {
    setAvatarOpen(true)
  }

  const handleAvatarClose = () => {
    setAvatarOpen(false)
  }

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  async function handleDeleteClick() {
    let commentIds = [comment._id]
    const postId = comment.post

    function getChildComments(arr) {
      arr.map(item => {
        commentIds.push(item._id)
        if (item.children) {
          return getChildComments(item.children)
        }
      })
    }

    try {
      await getChildComments(comment.children)

      const deletedComments = await commentDelete(commentIds, postId)
      setComments([...comments.filter(comment => !deletedComments.data.includes(comment._id))])
      handleAvatarClose()
      setAlert({ message: `Comment deleted successfully.`, variant: 'success' })
    } catch (error) {
      if (error) throw error
    }
  }

  function handleIsCommentForm() {
    setIsCommentForm(!isCommentForm)
  }

  return (
    <Grid container spacing={1}>
      <Grid item />

      <Grid item xs>
        {!isEditMode ? (
          <>
            <Header
              comment={comment}
              handleEditClick={handleEditClick}
              handleDeleteDialog={handleDeleteDialog}
            />
            <Box my={1} />
            <Box mb={2}>
              <Content comment={commentData} />
            </Box>

            <Vote comment={commentData} handleIsCommentForm={handleIsCommentForm} />
            <Box mt={1}>{!isCommentForm && <Divider />}</Box>

            {isCommentForm && (
              <CommentForm
                handleIsCommentForm={handleIsCommentForm}
                parentId={commentData._id}
                postId={commentData.post}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                setCommentData={setCommentData}
                comments={comments}
                setComments={setComments}
              />
            )}
          </>
        ) : (
          <CommentForm
            comment={commentData}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            setCommentData={setCommentData}
          />
        )}
      </Grid>

      <Dialog
        open={avatarOpen}
        onClose={handleAvatarClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this comment? This action can not be undone!
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleAvatarClose} color="secondary">
            No
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

CommentFeedItem.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentFeedItem
