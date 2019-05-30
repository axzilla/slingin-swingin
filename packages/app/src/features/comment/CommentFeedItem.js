// Packages
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/de'

// Actions
import { updateComment, deleteComment, updateCommentlikes } from './_actions'

// Component
import CommentEditContainer from './container/CommentEditContainer'
import CommentCreate from './CommentCreate'

// Utils
import isEmpty from '../../utils/isEmpty'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Material Colors
import { red } from '@material-ui/core/colors'

// Material Core
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'

// Material Icons
import { AddBox, Edit, Delete } from '@material-ui/icons'

const CommentFeedItem = ({
  deleteComment,
  updateComment,
  updateCommentlikes,
  post,
  comment,
  auth,
  history,
  isSubcomment
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAnswer, setIsAnswer] = useState(false)
  const onEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  const onDeleteClick = commentId => {
    if (
      window.confirm(
        'Bist du sicher, dass du diese Antwort löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden!'
      )
    ) {
      deleteComment(commentId)
    }
  }

  const onSaveClick = async text => {
    const commentData = {
      text,
      commentId: comment._id,
      refPostId: comment.refPostId,
      refPostShortId: comment.refPostShortId
    }

    await updateComment(commentData)
    setIsEditMode(false)
  }

  const onCommentLikeClick = () => {
    const { isAuthenticated } = auth

    if (isAuthenticated) {
      updateCommentlikes(comment)
    } else {
      history.push('/login')
    }
  }

  const toggleAnswerMode = () => {
    setIsAnswer(!isAnswer)
  }

  return (
    <React.Fragment>
      <Card
        style={{
          marginBottom: '20px',
          marginLeft: isSubcomment ? '10px' : null,
          borderLeft: isSubcomment ? '3px solid' : null,
          borderBottom: isSubcomment ? null : '3px solid'
        }}
      >
        <CardContent>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            {comment.user === null ? (
              <Avatar src="https://source.unsplash.com/random" />
            ) : (
              <Link to={`/${comment.user.username}`}>
                <Avatar
                  style={{ marginRight: '10px' }}
                  src={
                    isEmpty(comment.user.avatar)
                      ? avatarPlaceholder
                      : comment.user.avatar.secure_url
                  }
                />
              </Link>
            )}
            <div>
              {comment === null ? (
                <Typography>
                  <span>anonym</span>
                </Typography>
              ) : (
                <Link to={`/${comment.user.username}`}>
                  <Typography color="primary">
                    <span>{comment.user.username}</span>
                  </Typography>
                </Link>
              )}

              <Typography variant="caption" style={{ fontWeight: '300' }}>
                <Moment format="D MMM YYYY" locale="de">
                  {comment.dateCreated}
                </Moment>
              </Typography>
            </div>
          </div>

          {!isEditMode ? (
            <Typography
              dangerouslySetInnerHTML={{ __html: comment.text }}
              className="post-content"
            />
          ) : null}

          {isEditMode ? (
            <CommentEditContainer comment={comment} onSaveClick={onSaveClick} />
          ) : null}
        </CardContent>

        {!isEditMode ? (
          <React.Fragment>
            <Grid container justify="space-between">
              <Button
                disableRipple
                onClick={onCommentLikeClick}
                style={{ color: red[500] }}
              >
                {comment.likes.map(like => like.user).includes(auth.user.id) ? (
                  <i className="fas fa-heart fa-lg" />
                ) : (
                  <i className="far fa-heart fa-lg" />
                )}
                &nbsp;
                <Typography>{comment.likes.length}</Typography>
              </Button>

              <Grid item>
                {auth.isAuthenticated && comment.user._id === auth.user.id ? (
                  <React.Fragment>
                    <IconButton onClick={onEditClick}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDeleteClick(comment._id)}>
                      <Delete />
                    </IconButton>
                  </React.Fragment>
                ) : null}

                {auth.isAuthenticated && !isSubcomment ? (
                  <IconButton onClick={toggleAnswerMode}>
                    <AddBox />
                  </IconButton>
                ) : null}
              </Grid>
            </Grid>

            {isAnswer ? (
              <CardActions>
                <CommentCreate
                  postId={post._id}
                  postShortId={post.shortId}
                  onCommentId={comment._id}
                  toggleAnswerMode={toggleAnswerMode}
                />
              </CardActions>
            ) : null}
          </React.Fragment>
        ) : null}
      </Card>
    </React.Fragment>
  )
}

const mapStateToProps = ({ comments, auth }) => ({ comments, auth })

const mapDispatchToProps = {
  updateComment,
  deleteComment,
  updateCommentlikes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFeedItem)
