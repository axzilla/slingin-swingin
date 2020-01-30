import React from 'react'
import PropTypes from 'prop-types'
import { NextLink } from '../../../components'
import { Typography } from '@material-ui/core'

function PostDetailsCreator({ post }) {
  let content = {}

  if (post.user === null) {
    content = <Typography>anonym</Typography>
  } else {
    content = (
      <NextLink href={`/${post.user.username}`}>
        <Typography color="primary" style={{ display: 'inline' }}>
          {post.user.username}
        </Typography>
      </NextLink>
    )
  }

  return <React.Fragment>{content}</React.Fragment>
}

PostDetailsCreator.propTypes = {
  post: PropTypes.object
}

export default PostDetailsCreator
