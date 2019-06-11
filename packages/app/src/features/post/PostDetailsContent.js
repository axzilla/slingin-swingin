import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

function PostDeatilsItemContent({ post }) {
  return (
    <Typography
      dangerouslySetInnerHTML={{ __html: post.text }}
      style={{ marginBottom: '20px' }}
      className="post-content"
    />
  )
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
