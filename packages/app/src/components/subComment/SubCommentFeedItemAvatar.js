import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../components/LinkRouter'
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
import isEmpty from '../../utils/isEmpty'
import { Avatar, ListItemAvatar } from '@material-ui/core'

function SubCommentFeedItemAvatar({ subComment }) {
  return (
    <ListItemAvatar>
      <LinkRouter to={`/${subComment.user.username}`}>
        <Avatar
          alt={subComment.user.username}
          src={
            isEmpty(subComment.user.avatar) ? avatarPlaceholder : subComment.user.avatar.secure_url
          }
        />
      </LinkRouter>
    </ListItemAvatar>
  )
}

SubCommentFeedItemAvatar.propTypes = {
  subComment: PropTypes.object
}

export default SubCommentFeedItemAvatar
