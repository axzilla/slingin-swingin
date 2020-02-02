import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

function PostDeatilsItemContent({ post }) {
  return <Typography>{post.text}</Typography>
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
