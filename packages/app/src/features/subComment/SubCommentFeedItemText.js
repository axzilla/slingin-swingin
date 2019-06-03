// Packages
import React from 'react'

// Material Core
import { Typography } from '@material-ui/core'

const SubCommentFeedItemText = ({ subComment }) => {
  return <Typography>{subComment.text}</Typography>
}

export default SubCommentFeedItemText
