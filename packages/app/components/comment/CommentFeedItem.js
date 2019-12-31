import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '../../contexts/AuthContext'
import { commentUpdate, commentDelete } from '../../services/comment'
import { getSubCommentsByCommentRef } from '../../services/subComment'

import CommentEdit from './CommentEdit'
import CommentFeedItemHeader from './CommentFeedItemHeader'
import CommentFeedItemText from './CommentFeedItemText'
import CommentFeedItemMenu from './CommentFeedItemMenu'
import CommentFeedItemVote from './CommentFeedItemVote'
import SubCommentFeedItem from '../subComment/SubCommentFeedItem'
import SubCommentCreate from '../subComment/SubCommentCreate'

import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, CardActions, Divider, List } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

function CommentFeedItem({ post, comment, commentsByPostRef, setCommentsByPostRef }) {
  const classes = useStyles()
  const { isAuthenticated } = useContext(AuthContext)
  const [isEditMode, setIsEditMode] = useState(false)
  const [subComments, setSubComments] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)

  async function getInitialProps() {
    try {
      const res = await getSubCommentsByCommentRef(comment._id)
      setSubComments(res.data)
    } catch (error) {
      if (error) throw error
    }
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
    try {
      const commentData = {
        text,
        commentId: comment._id,
        refPost: comment.refPost
      }

      setIsEditMode(false)

      const updatedComment = await commentUpdate(commentData)

      const index = commentsByPostRef.indexOf(
        commentsByPostRef.filter(comment => {
          return comment._id === updatedComment.data._id
        })[0]
      )

      setCommentsByPostRef([
        ...commentsByPostRef.slice(0, index),
        updatedComment.data,
        ...commentsByPostRef.slice(index + 1)
      ])
    } catch (error) {
      if (error) throw error
    }
  }

  async function onDeleteClick(commentId) {
    try {
      if (window.confirm('Kommentar löschen?')) {
        const deletedComment = await commentDelete(commentId)

        const index = commentsByPostRef.indexOf(
          commentsByPostRef.filter(comment => {
            return comment._id === deletedComment.data._id
          })[0]
        )

        setCommentsByPostRef([
          ...commentsByPostRef.slice(0, index),
          ...commentsByPostRef.slice(index + 1)
        ])
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

      {isAuthenticated ? (
        <CardContent>
          <SubCommentCreate
            postId={post._id}
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
  post: PropTypes.object,
  comment: PropTypes.object,
  commentsByPostRef: PropTypes.array,
  setCommentsByPostRef: PropTypes.func
}

export default CommentFeedItem
