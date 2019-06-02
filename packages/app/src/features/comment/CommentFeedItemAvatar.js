// Packages
import React from 'react'
import { Link } from 'react-router-dom'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Utils
import isEmpty from '../../utils/isEmpty'

// Material Core
import { Avatar } from '@material-ui/core'

const CommentFeedItemAvatar = ({ comment }) => {
  return (
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
  )
}

export default CommentFeedItemAvatar
