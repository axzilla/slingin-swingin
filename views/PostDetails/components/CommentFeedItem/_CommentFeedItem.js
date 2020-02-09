import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { commentUpdate, commentDelete } from '@services/comment'
import AuthContext from '@contexts/AuthContext'
import htmlToMarkdown from '@utils/htmlToMarkdown'

import Edit from './components/Edit'
import Header from './components/Header'
import Content from './components/Content'
import Vote from './components/Vote'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const useStyles = makeStyles({ card: { marginBottom: '20px' } })

function CommentFeedItem({ comment, comments, setComments }) {
  const classes = useStyles()
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

  async function handleSaveClick(content) {
    try {
      const commentData = {
        content: htmlToMarkdown(content),
        commentId: comment._id,
        post: comment.post
      }

      setIsEditMode(false)
      const updatedComment = await commentUpdate(commentData)
      setCommentData(updatedComment.data)
    } catch (error) {
      if (error) throw error
    }
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
      <Card className={classes.card}>
        {!isEditMode ? (
          <>
            <Header comment={comment} />
            <CardContent>
              <Content comment={commentData} />
            </CardContent>
          </>
        ) : (
          <CardContent>
            <Edit comment={commentData} handleSaveClick={handleSaveClick} />
          </CardContent>
        )}
        <Divider />
        <CardActions disableSpacing>
          <Vote comment={commentData} />
        </CardActions>
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
          <Button onClick={handleAvatarClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteClick} color="primary" autoFocus>
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
