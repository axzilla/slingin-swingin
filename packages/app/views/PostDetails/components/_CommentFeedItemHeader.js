import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment/locale/de'

import AuthContext from '../../../contexts/AuthContext'

import { Link } from '../../../components'

import { makeStyles } from '@material-ui/styles'
import { CardHeader, Avatar, IconButton } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

function CommentFeedItemHeader({ comment, handleMenuClick }) {
  const classes = useStyles()
  const { user, isAuthenticated } = useContext(AuthContext)

  return (
    <CardHeader
      avatar={
        comment.user.avatar ? (
          <Link href={`/${comment.user.username}`}>
            <Avatar
              src={comment.user.avatar ? comment.user.avatar.secure_url : null}
              aria-label="Recipe"
              className={classes.avatar}
            />
          </Link>
        ) : (
          <Link href={`/${comment.user.username}`}>
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {comment.user.username.substring(0, 1)}
            </Avatar>
          </Link>
        )
      }
      action={
        (isAuthenticated && user.id === comment.user._id) || (user.roles && user.roles.isAdmin) ? (
          <IconButton
            aria-label="Settings"
            aria-controls="customized-menu"
            onClick={handleMenuClick}
          >
            <MoreVert />
          </IconButton>
        ) : null
      }
      title={<Link href={`/${comment.user.username}`}>{comment.user.username}</Link>}
      subheader={
        <Moment fromNow locale="de">
          {comment.dateCreated}
        </Moment>
      }
    />
  )
}

CommentFeedItemHeader.propTypes = {
  comment: PropTypes.object,
  handleMenuClick: PropTypes.func
}

export default CommentFeedItemHeader
