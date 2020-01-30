import React from 'react'
import PropTypes from 'prop-types'
import { NextLink } from '../../../components'
import { Avatar } from '@material-ui/core'

function PostDetailsAvatar({ post }) {
  return (
    <NextLink href={`/${post.user.username}`}>
      {post.user.avatar && post.user.avatar.secure_url ? (
        <Avatar alt={post.user.username} src={post.user.avatar.secure_url} />
      ) : (
        <Avatar alt={post.user.username}>{post.user.username.substring(0, 1)}</Avatar>
      )}
    </NextLink>
  )
}

PostDetailsAvatar.propTypes = {
  post: PropTypes.object
}

export default PostDetailsAvatar
