// Packages
import React from 'react'
import { Link } from 'react-router-dom'

// Utils
import isEmpty from '../../utils/isEmpty'

// Assets
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'

// Material Core
import { Avatar } from '@material-ui/core'

const PostDetailsAvatar = props => {
  const { post } = props
  let content = {}

  if (post.user === null) {
    content = <Avatar src={avatarPlaceholder} />
  } else {
    content = (
      <Link to={`/${post.user.username}`}>
        <Avatar
          src={
            isEmpty(post.user.avatar)
              ? avatarPlaceholder
              : post.user.avatar.secure_url
          }
        />
      </Link>
    )
  }

  return <React.Fragment>{content}</React.Fragment>
}

export default PostDetailsAvatar
