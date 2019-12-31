import React from 'react'
import PropTypes from 'prop-types'
import StyledReactMarkdown from '../../common/StyledReactMarkdown'

function PostDeatilsItemContent({ post }) {
  return <StyledReactMarkdown source={post.text} escapeHtml={false} type="read" />
}

PostDeatilsItemContent.propTypes = {
  post: PropTypes.object
}

export default PostDeatilsItemContent
