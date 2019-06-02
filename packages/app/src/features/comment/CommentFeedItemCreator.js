// Packages
import React from 'react'
import { Link } from 'react-router-dom'

// Material Core
import { Typography } from '@material-ui/core'

const CommentFeedItemCreator = ({ comment }) => {
  return (
    <Link to={`/${comment.user.username}`}>
      <Typography color="primary">{comment.user.username}</Typography>
    </Link>
  )
}

export default CommentFeedItemCreator
