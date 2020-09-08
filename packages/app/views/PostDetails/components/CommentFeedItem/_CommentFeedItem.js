import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { commentDelete } from '@services/comment'
import AuthContext from '@contexts/AuthContext'

import CommentForm from '@components/CommentForm'

import Header from './components/Header'
import Content from './components/Content'
import Vote from './components/Vote'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

function CommentFeedItem({ comment, comments, setComments }) {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [commentData, setCommentData] = useState(comment)
  const [isEditMode, setIsEditMode] = useState(false)
  const [avatarOpen, setAvatarOpen] = React.useState(false)

  const handleAvatarOpen = () => {
    setAvatarOpen(true)
  }

  const handleAvatarClose = () => {
    setAvatarOpen(false)
  }

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  async function handleDeleteClick() {
    try {
      const deletedComment = await commentDelete(comment._id)

      const index = comments.indexOf(
        comments.filter(comment => {
          return comment._id === deletedComment.data._id
        })[0]
      )

      setComments([...comments.slice(0, index), ...comments.slice(index + 1)])
      handleAvatarClose()
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <>
      <Card>
        {!isEditMode ? (
          <>
            <Header comment={comment} />
            <CardContent>
              <Content comment={commentData} />
            </CardContent>
          </>
        ) : (
          <CardContent>
            <CommentForm
              comment={commentData}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              setCommentData={setCommentData}
            />
          </CardContent>
        )}
        <Box m={2}>
          <Vote comment={commentData} />
        </Box>
        {isAuthenticated && user.id === comment.user._id && (
          <>
            <Divider />
            <CardActions disableSpacing>
              <Grid container>
                <Button onClick={handleEditClick}>Edit</Button>
                <Button onClick={handleAvatarOpen}>Delete</Button>
              </Grid>
            </CardActions>
          </>
        )}
      </Card>

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
    </>
  )
}

CommentFeedItem.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func
}

export default CommentFeedItem
