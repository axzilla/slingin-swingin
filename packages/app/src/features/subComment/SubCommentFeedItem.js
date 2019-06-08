// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/de'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'

// Contexts
import { useAuth } from '../../contexts/auth'

// Services
import { updateSubComment, deleteSubComment } from './_services'

// Components
import Link from '../../components/Link'
import SubCommentEdit from './SubCommentEdit'
import SubCommentFeedItemAvatar from './SubCommentFeedItemAvatar'
import SubCommentFeedItemMenu from './SubCommentFeedItemMenu'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Icons
import { MoreVert } from '@material-ui/icons'

// Material Core
import {
  // List,
  ListItem,
  IconButton,
  ListItemText,
  Typography,
  Divider,
  CardContent
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}))

const SubCommentFeedItem = ({ subComment, subComments, setSubComments, index }) => {
  const { auth } = useAuth()
  const classes = useStyles()
  const [isEditMode, setIsEditMode] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  function onEditClick() {
    setIsEditMode(!isEditMode)
  }

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  async function onSaveClick(text) {
    const subCommentData = {
      text,
      subCommentId: subComment._id
    }

    setIsEditMode(false)

    await updateSubComment(subCommentData).then(res => {
      const updatedSubComment = res.data
      const index = subComments.indexOf(
        subComments.filter(comment => {
          return comment._id === updatedSubComment._id
        })[0]
      )

      setSubComments([
        ...subComments.slice(0, index),
        updatedSubComment,
        ...subComments.slice(index + 1)
      ])
    })
  }

  function onDeleteClick(subCommentId) {
    if (window.confirm('Kommentar löschen?')) {
      deleteSubComment(subCommentId).then(res => {
        const deletedSubComment = res.data

        const index = subComments.indexOf(
          subComments.filter(subComment => {
            return subComment._id === deletedSubComment._id
          })[0]
        )

        setSubComments([...subComments.slice(0, index), ...subComments.slice(index + 1)])
      })
    }
  }

  return (
    <React.Fragment>
      {!isEditMode ? (
        <>
          <ListItem alignItems="flex-start">
            <SubCommentFeedItemAvatar subComment={subComment} />
            <ListItemText
              primary={
                <Typography>
                  <ReactMarkdown
                    source={subComment.text}
                    escapeHtml={false}
                    renderers={{ code: CodeBlock }}
                  />
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Link to={`/${subComment.user.username}`}>
                    <Typography component="span" variant="body2" className={classes.inline}>
                      {subComment.user.username}
                    </Typography>
                  </Link>
                  {' — '}
                  <Moment fromNow locale="de">
                    {subComment.dateCreated}
                  </Moment>
                </React.Fragment>
              }
            />
            {auth.isAuthenticated && auth.user.id === subComment.user._id ? (
              <IconButton
                aria-label="Settings"
                aria-controls="customized-menu"
                onClick={handleMenuClick}
              >
                <MoreVert />
              </IconButton>
            ) : null}

            <SubCommentFeedItemMenu
              subComment={subComment}
              handleMenuClick={handleMenuClick}
              handleMenuClose={handleMenuClose}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              anchorEl={anchorEl}
            />
          </ListItem>
        </>
      ) : (
        <CardContent>
          <SubCommentEdit subComment={subComment} onSaveClick={onSaveClick} />
        </CardContent>
      )}
      {subComments.length !== index + 1 ? <Divider variant="inset" component="li" /> : null}
    </React.Fragment>
  )
}

SubCommentFeedItem.propTypes = {
  subComment: PropTypes.object.isRequired,
  subComments: PropTypes.array.isRequired,
  setSubComments: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired
}

export default SubCommentFeedItem
