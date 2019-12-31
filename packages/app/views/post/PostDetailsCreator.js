import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../views/LinkRouter'
import { Typography } from '@material-ui/core'

function PostDetailsCreator({ post }) {
  let content = {}

  if (post.user === null) {
    content = <Typography>anonym</Typography>
  } else {
    content = (
      <LinkRouter href={`/${post.user.username}`}>
        <Typography color="primary" style={{ display: 'inline' }}>
          {post.user.username}
        </Typography>
      </LinkRouter>
    )
  }

  return <React.Fragment>{content}</React.Fragment>
}

PostDetailsCreator.propTypes = {
  post: PropTypes.object
}

export default PostDetailsCreator
