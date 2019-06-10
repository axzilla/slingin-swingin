// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { updateComment, deleteComment } from './_services'
import { getSubCommentByCommentId } from '../subComment/_services'

// Components
import CommentEdit from './CommentEdit'
import CommentFeedItemHeader from './CommentFeedItemHeader'
import CommentFeedItemText from './CommentFeedItemText'
import CommentFeedItemMenu from './CommentFeedItemMenu'
import CommentFeedItemVote from './CommentFeedItemVote'
import SubCommentFeedItem from '../subComment/SubCommentFeedItem'
import SubCommentCreate from '../subComment/SubCommentCreate'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Card, CardContent, CardActions, Divider, List } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

function CommentFeedItem({ comment, commentsByPostRef, setCommentsByPostRef }) {
  const classes = useStyles()
  const { auth } = useAuth()
  const [isEditMode, setIsEditMode] = useState(false)
  const [subComments, setSubComments] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)

  async function getInitialProps() {
    const res = await getSubCommentByCommentId(comment._id)
    setSubComments(res.data)
  }

  useEffect(() => {
    getInitialProps()
  }, [])

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
    const commentData = {
      text,
      commentId: comment._id,
      refPostId: comment.refPost
    }

    setIsEditMode(false)

    await updateComment(commentData).then(res => {
      const updatedComment = res.data
      const index = commentsByPostRef.indexOf(
        commentsByPostRef.filter(comment => {
          return comment._id === updatedComment._id
        })[0]
      )

      setCommentsByPostRef([
        ...commentsByPostRef.slice(0, index),
        updatedComment,
        ...commentsByPostRef.slice(index + 1)
      ])
    })
  }

  function onDeleteClick(commentId) {
    if (window.confirm('Kommentar löschen?')) {
      deleteComment(commentId).then(res => {
        const deletedComment = res.data

        const index = commentsByPostRef.indexOf(
          commentsByPostRef.filter(comment => {
            return comment._id === deletedComment._id
          })[0]
        )

        setCommentsByPostRef([
          ...commentsByPostRef.slice(0, index),
          ...commentsByPostRef.slice(index + 1)
        ])
      })
    }
  }

  return (
    <Card className={classes.card}>
      {!isEditMode ? (
        <>
          <CommentFeedItemHeader comment={comment} handleMenuClick={handleMenuClick} />

          <CommentFeedItemMenu
            comment={comment}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            anchorEl={anchorEl}
          />

          <CardContent>
            <CommentFeedItemText comment={comment} />
          </CardContent>
        </>
      ) : (
        <CardContent>
          <CommentEdit comment={comment} onSaveClick={onSaveClick} />
        </CardContent>
      )}
      <Divider />

      <CardActions disableSpacing>
        <CommentFeedItemVote
          comment={comment}
          commentsByPostRef={commentsByPostRef}
          setCommentsByPostRef={setCommentsByPostRef}
        />
      </CardActions>

      <Divider />

      {subComments.length ? (
        <List className={classes.root}>
          {subComments.map((subComment, index) => {
            return (
              <SubCommentFeedItem
                index={index}
                subComment={subComment}
                subComments={subComments}
                setSubComments={setSubComments}
                key={subComment._id}
              />
            )
          })}
        </List>
      ) : null}

      {auth.isAuthenticated ? (
        <CardContent>
          <SubCommentCreate
            comment={comment}
            subComments={subComments}
            setSubComments={setSubComments}
          />
        </CardContent>
      ) : null}
    </Card>
  )
}

CommentFeedItem.propTypes = {
  comment: PropTypes.string.isRequired,
  commentsByPostRef: PropTypes.array.isRequired,
  setCommentsByPostRef: PropTypes.func.isRequired
}

export default CommentFeedItem
