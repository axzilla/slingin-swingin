// Packages
import React from 'react'

// Material Core
import { Typography } from '@material-ui/core'

const CommentFeedItemtext = ({ comment }) => {
  return (
    <Typography
      dangerouslySetInnerHTML={{ __html: comment.text }}
      className="post-content"
    />
  )
}

export default CommentFeedItemtext
