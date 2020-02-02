import React from 'react'
import PropTypes from 'prop-types'

import htmlToMui from '../../../utils/htmlToMui'
import Typography from '@material-ui/core/Typography'

function CommentFeedItemtext({ comment }) {
  return <Typography dangerouslySetInnerHTML={{ __html: htmlToMui(comment.text) }} />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
