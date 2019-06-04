// Packages
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import 'moment/locale/de'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { updateComment, deleteComment } from './_services'
import { getSubCommentByCommentId } from '../subComment/_services'

// Component
import Link from '../../components/Link'
import CommentEditContainer from './container/CommentEditContainer'
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
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  List,
  Avatar,
  IconButton
} from '@material-ui/core'

// Material Icons
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  header: {
    // marginBottom: '20px'
  },
  buttonContainer: {
    // margin: '-20px auto'
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

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
        <React.Fragment>
          <CardHeader
            avatar={
              comment.user.avatar ? (
                <Link to={`/${comment.user.username}`}>
                  <Avatar
                    src={
                      comment.user.avatar
                        ? comment.user.avatar.secure_url
                        : null
                    }
                    aria-label="Recipe"
                    className={classes.avatar}
                  />
                </Link>
              ) : (
                <Link to={`/${comment.user.username}`}>
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {comment.user.username.substring(0, 1)}
                  </Avatar>
                </Link>
              )
            }
            action={
              <IconButton aria-label="Settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Link to={`/${comment.user.username}`}>
                {comment.user.username}
              </Link>
            }
            subheader={
              <Moment fromNow locale="de">
                {comment.dateCreated}
              </Moment>
            }
          />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <CardContent>
              <CommentFeedItemText comment={comment} />
            </CardContent>
          </Grid>
        </React.Fragment>
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
