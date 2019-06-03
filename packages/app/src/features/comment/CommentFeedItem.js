// Packages
import React, { useState, useEffect } from 'react'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { updateComment, deleteComment } from './_services'
import {
  getSubCommentByCommentId,
  createSubComment
} from '../subComment/_services'

// Component
import CommentEditContainer from './container/CommentEditContainer'
import CommentCreate from './CommentCreate'
import CommentFeedItemAvatar from './CommentFeedItemAvatar'
import CommentFeedItemCreator from './CommentFeedItemCreator'
import CommentFeedItemDate from './CommentFeedItemDate'
import CommentFeedItemText from './CommentFeedItemText'
import CommentFeedItemButtons from './CommentFeedItemButtons'
import CommentFeedItemVote from './CommentFeedItemVote'
import SubCommentFeedItem from '../subComment/SubCommentFeedItem'
import SubCommentCreate from '../subComment/SubCommentCreate'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import {
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  Divider
} from '@material-ui/core'

const useStyles = makeStyles({
  card: { marginBottom: '20px' },
  header: {
    marginBottom: '20px'
  }
})

const CommentFeedItem = ({
  post,
  comment,
  history,
  commentsByPostRef,
  setCommentsByPostRef
}) => {
  const classes = useStyles()
  const { auth } = useAuth()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAnswer, setIsAnswer] = useState(false)
  const [subComments, setSubComments] = useState([])

  useEffect(() => {
    getInitialProps()
  }, [])

  const getInitialProps = async () => {
    const res = await getSubCommentByCommentId(comment._id)
    setSubComments(res.data)
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
        <CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={1}>
              <CommentFeedItemVote
                comment={comment}
                commentsByPostRef={commentsByPostRef}
                setCommentsByPostRef={setCommentsByPostRef}
              />
            </Grid>
            <Grid item xs={11}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.header}
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <CommentFeedItemAvatar comment={comment} />
                    <Grid>
                      <CommentFeedItemCreator comment={comment} />
                      <CommentFeedItemDate comment={comment} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  {comment.user._id === auth.user.id ? (
                    <CommentFeedItemButtons
                      comment={comment}
                      onDeleteClick={onDeleteClick}
                      onEditClick={onEditClick}
                    />
                  ) : null}
                </Grid>
              </Grid>
              <CommentFeedItemText comment={comment} />
            </Grid>
          </Grid>
        </CardContent>
      ) : (
        <CardContent>
          <CommentEditContainer comment={comment} onSaveClick={onSaveClick} />
        </CardContent>
      )}

      <Divider style={{ height: '2px' }} />

      {subComments.length ? (
        <CardContent>
          {subComments.map((subComment, index) => {
            return (
              <>
                <SubCommentFeedItem
                  subComment={subComment}
                  subComments={subComments}
                  setSubComments={setSubComments}
                  key={index}
                />
                {subComments.length === index + 1 ? null : (
                  <Divider style={{ margin: '10px 0' }} />
                )}
              </>
            )
          })}
        </CardContent>
      ) : null}

      {subComments.length ? <Divider style={{ height: '2px' }} /> : null}

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

export default CommentFeedItem
