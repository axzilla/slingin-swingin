import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../components/LinkRouter'
import isEmpty from '../../utils/isEmpty'
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
import { Avatar } from '@material-ui/core'

function PostDetailsAvatar({ post }) {
  let content = {}

  if (post.user === null) {
    content = <Avatar src={avatarPlaceholder} />
  } else {
    content = (
      <LinkRouter to={`/${post.user.username}`}>
        <Avatar src={isEmpty(post.user.avatar) ? avatarPlaceholder : post.user.avatar.secure_url} />
      </LinkRouter>
    )
  }

  return <React.Fragment>{content}</React.Fragment>
}

PostDetailsAvatar.propTypes = {
  post: PropTypes.object
}

export default PostDetailsAvatar
