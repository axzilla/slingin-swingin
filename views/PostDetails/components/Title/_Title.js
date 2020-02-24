import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

function PostDetailsTitle({ post }) {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {post.title}
    </Typography>
  )
}

PostDetailsTitle.propTypes = {
  post: PropTypes.object
}

export default PostDetailsTitle
