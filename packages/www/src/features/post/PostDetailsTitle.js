// Packages
import React from 'react'

// Material Core
import { Typography } from '@material-ui/core'

const PostDetailsTitle = props => {
  const { post } = props

  return (
    <Typography variant="h4" component="h1">
      {post.title}
    </Typography>
  )
}

export default PostDetailsTitle
