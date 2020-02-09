import React from 'react'
import PropTypes from 'prop-types'

import htmlToMui from '@utils/htmlToMui'
import markdownToHtml from '@utils/markdownToHtml'

function CommentFeedItemtext({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlToMui(markdownToHtml(comment.content)) }} />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
