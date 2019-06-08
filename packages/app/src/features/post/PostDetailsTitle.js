import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

function PostDetailsTitle({ post }) {
  return (
    <Typography variant="h4" component="h1">
      {post.title}
    </Typography>
  )
}

PostDetailsTitle.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostDetailsTitle
