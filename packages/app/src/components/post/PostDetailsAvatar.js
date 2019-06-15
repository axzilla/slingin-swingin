import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../components/LinkRouter'
import { Avatar } from '@material-ui/core'

function PostDetailsAvatar({ post }) {
  return (
    <LinkRouter to={`/${post.user.username}`}>
      {post.user.avatar && post.user.avatar.secure_url ? (
        <Avatar alt={post.user.username} src={post.user.avatar.secure_url} />
      ) : (
        <Avatar alt={post.user.username}>{post.user.username.substring(0, 1)}</Avatar>
      )}
    </LinkRouter>
  )
}

PostDetailsAvatar.propTypes = {
  post: PropTypes.object
}

export default PostDetailsAvatar
