// Packages
import React from 'react'

// Material Core
import { Typography } from '@material-ui/core'

const PostDeatilsItemContent = props => {
  const { post } = props

  return (
    <Typography
      dangerouslySetInnerHTML={{ __html: post.text }}
      style={{ marginBottom: '20px' }}
      className="post-content"
    />
  )
}

export default PostDeatilsItemContent
