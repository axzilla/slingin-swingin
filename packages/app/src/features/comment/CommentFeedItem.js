// Packages
import React, { useState, useEffect } from 'react'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { updateComment, deleteComment } from './_services'
import { getSubCommentByCommentId } from '../subComment/_services'

// Component
import CommentEditContainer from './container/CommentEditContainer'
// import CommentFeedItemAvatar from './CommentFeedItemAvatar'
// import CommentFeedItemCreator from './CommentFeedItemCreator'
// import CommentFeedItemDate from './CommentFeedItemDate'
import CommentFeedItemHeader from './CommentFeedItemHeader'
import CommentFeedItemText from './CommentFeedItemText'
import CommentFeedItemMenu from './CommentFeedItemMenu'
import CommentFeedItemVote from './CommentFeedItemVote'
import SubCommentFeedItem from '../subComment/SubCommentFeedItem'
import SubCommentCreate from '../subComment/SubCommentCreate'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  List
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

const CommentFeedItem = ({
  comment,
  commentsByPostRef,
  setCommentsByPostRef
}) => {
  const classes = useStyles()
  const { auth } = useAuth()
  const [isEditMode, setIsEditMode] = useState(false)
  const [subComments, setSubComments] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)

  const getInitialProps = async () => {
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

  const onDeleteClick = commentId => {
    if (
      window.confirm(
        'Bist du sicher, dass du diese Antwort löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden!'
      )
    ) {
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

  const onEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  const onSaveClick = async text => {
    const commentData = {
      text,
      commentId: comment._id,
      refPostId: comment.refPostId,
      refPostShortId: comment.refPostShortId
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

  return (
    <Card className={classes.card}>
      {!isEditMode ? (
        <>
          <CommentFeedItemHeader
            comment={comment}
            handleMenuClick={handleMenuClick}
          />

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
          <CommentEditContainer comment={comment} onSaveClick={onSaveClick} />
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
                key={index}
              />
            )
          })}
        </List>
      ) : null}

      {auth.isAuthenticated ? (
        <SubCommentCreate
          comment={comment}
          subComments={subComments}
          setSubComments={setSubComments}
        />
      ) : null}
    </Card>
  )
}

export default CommentFeedItem
