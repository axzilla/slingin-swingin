import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/de'
import StyledReactMarkdown from '../common/StyledReactMarkdown'
import AuthContext from '../../contexts/AuthContext'
import { subCommentUpdate, subCommentDelete } from '../../services/subComment'
import { Link } from '../../components'
import SubCommentEdit from './SubCommentEdit'
import SubCommentFeedItemAvatar from './SubCommentFeedItemAvatar'
import SubCommentFeedItemMenu from './SubCommentFeedItemMenu'
import { makeStyles } from '@material-ui/styles'
import { MoreVert } from '@material-ui/icons'
import {
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

function SubCommentFeedItem({ subComment, subComments, setSubComments, index }) {
  const { user, isAuthenticated } = useContext(AuthContext)
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
    try {
      const subCommentData = {
        text,
        subCommentId: subComment._id
      }

      setIsEditMode(false)

      const updatedSubComment = await subCommentUpdate(subCommentData)

      const index = subComments.indexOf(
        subComments.filter(comment => {
          return comment._id === updatedSubComment.data._id
        })[0]
      )

      setSubComments([
        ...subComments.slice(0, index),
        updatedSubComment.data,
        ...subComments.slice(index + 1)
      ])
    } catch (error) {
      if (error) throw error
    }
  }

  async function onDeleteClick(subCommentId) {
    try {
      if (window.confirm('Kommentar löschen?')) {
        const deletedSubComment = await subCommentDelete(subCommentId)

        const index = subComments.indexOf(
          subComments.filter(subComment => {
            return subComment._id === deletedSubComment.data._id
          })[0]
        )

        setSubComments([...subComments.slice(0, index), ...subComments.slice(index + 1)])
      }
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <React.Fragment>
      {!isEditMode ? (
        <>
          <ListItem alignItems="flex-start">
            <SubCommentFeedItemAvatar subComment={subComment} />
            <ListItemText
              primary={<StyledReactMarkdown source={subComment.text} escapeHtml={false} />}
              secondary={
                <React.Fragment>
                  <Link href={`/${subComment.user.username}`}>
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
            {(isAuthenticated && user.id === subComment.user._id) ||
            (user.roles && user.roles.isAdmin) ? (
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
  subComment: PropTypes.object,
  subComments: PropTypes.array,
  setSubComments: PropTypes.func,
  index: PropTypes.number
}

export default SubCommentFeedItem
