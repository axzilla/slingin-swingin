import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { Link } from '../../../components'

import { makeStyles } from '@material-ui/styles'
import { CardHeader, Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: { marginBottom: '20px' },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5)
  }
}))

function CommentFeedItemHeader({ comment }) {
  const classes = useStyles()

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
      title={<Link href={`/${comment.user.username}`}>{comment.user.username}</Link>}
      subheader={<Moment fromNow>{comment.dateCreated}</Moment>}
    />
  )
}

CommentFeedItemHeader.propTypes = {
  comment: PropTypes.object,
  handleMenuClick: PropTypes.func
}

export default CommentFeedItemHeader
