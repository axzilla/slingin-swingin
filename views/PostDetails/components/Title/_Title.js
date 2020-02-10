import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

function PostDetailsTitle({ post }) {
  return (
    <Typography variant="h5" component="h1">
      {post.title}
    </Typography>
  )
}

PostDetailsTitle.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTitle
