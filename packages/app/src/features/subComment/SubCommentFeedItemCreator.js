// Packages
import React from 'react'

// Components
import Link from '../../components/Link'

// Material Core
import { Typography } from '@material-ui/core'

const SubCommentFeedItemCreator = ({ subComment }) => {
  return (
    <Link to={`/${subComment.user.username}`}>
      <Typography color="primary">{subComment.user.username}</Typography>
    </Link>
  )
}

export default SubCommentFeedItemCreator
