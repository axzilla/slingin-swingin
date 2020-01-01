import React from 'react'
import PropTypes from 'prop-types'
import StyledReactMarkdown from '../../common/StyledReactMarkdown'

function CommentFeedItemtext({ comment }) {
  return <StyledReactMarkdown source={comment.text} escapeHtml={false} type="read" />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
