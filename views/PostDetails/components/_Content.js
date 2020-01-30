import React from 'react'
import PropTypes from 'prop-types'
import { StyledReactMarkdown } from '../../../components'

function PostDeatilsItemContent({ post }) {
  return <StyledReactMarkdown source={post.text} escapeHtml={false} type="read" />
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
