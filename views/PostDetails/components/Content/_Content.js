import React from 'react'
import PropTypes from 'prop-types'

import htmlToMui from '@utils/htmlToMui'

import Typography from '@material-ui/core/Typography'

function PostDeatilsItemContent({ post }) {
  return <Typography dangerouslySetInnerHTML={{ __html: htmlToMui(post.text) }} />
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
