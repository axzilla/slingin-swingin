import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Typography } from '@material-ui/core'

function PostDetailsDate({ post }) {
  return (
    <Typography style={{ display: 'inline' }}>
      <Moment fromNow locale="de">
        {post.dateCreated}
      </Moment>
    </Typography>
  )
}

PostDetailsDate.propTypes = {
  post: PropTypes.object
}

export default PostDetailsDate
