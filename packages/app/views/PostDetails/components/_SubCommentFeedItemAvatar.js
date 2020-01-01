import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '../../../components'
import { Avatar, ListItemAvatar } from '@material-ui/core'

function SubCommentFeedItemAvatar({ subComment }) {
  return (
    <ListItemAvatar>
      <Link href={`/${subComment.user.username}`}>
        {subComment.user.avatar && subComment.user.avatar.secure_url ? (
          <Avatar alt={subComment.user.username} src={subComment.user.avatar.secure_url} />
        ) : (
          <Avatar alt={subComment.user.username}>{subComment.user.username.substring(0, 1)}</Avatar>
        )}
      </Link>
    </ListItemAvatar>
  )
}

SubCommentFeedItemAvatar.propTypes = {
  subComment: PropTypes.object
}

export default SubCommentFeedItemAvatar
