import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../views/LinkRouter'
import { Avatar, ListItemAvatar } from '@material-ui/core'

function SubCommentFeedItemAvatar({ subComment }) {
  return (
    <ListItemAvatar>
      <LinkRouter href={`/${subComment.user.username}`}>
        {subComment.user.avatar && subComment.user.avatar.secure_url ? (
          <Avatar alt={subComment.user.username} src={subComment.user.avatar.secure_url} />
        ) : (
          <Avatar alt={subComment.user.username}>{subComment.user.username.substring(0, 1)}</Avatar>
        )}
      </LinkRouter>
    </ListItemAvatar>
  )
}

SubCommentFeedItemAvatar.propTypes = {
  subComment: PropTypes.object
}

export default SubCommentFeedItemAvatar
