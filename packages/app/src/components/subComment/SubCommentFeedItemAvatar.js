import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../components/Link'
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
import isEmpty from '../../utils/isEmpty'
import { Avatar, ListItemAvatar } from '@material-ui/core'

function SubCommentFeedItemAvatar({ subComment }) {
  return (
    <ListItemAvatar>
      <Link to={`/${subComment.user.username}`}>
        <Avatar
          alt={subComment.user.username}
          src={
            isEmpty(subComment.user.avatar) ? avatarPlaceholder : subComment.user.avatar.secure_url
          }
        />
      </Link>
    </ListItemAvatar>
  )
}

SubCommentFeedItemAvatar.propTypes = {
  subComment: PropTypes.object
}

export default SubCommentFeedItemAvatar
