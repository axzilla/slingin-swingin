import React from 'react'
import PropTypes from 'prop-types'

import rawToHtml from '@utils/rawToHtml'
import htmlToMui from '@utils/htmlToMui'

function CommentFeedItemtext({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlToMui(rawToHtml(comment.contentRaw)) }} />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
