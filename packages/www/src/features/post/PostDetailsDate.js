// Packages
import React from 'react'
import Moment from 'react-moment'

// Material Core
import { Typography } from '@material-ui/core'

const PostDetailsDate = props => {
  const { post } = props

  return (
    <Typography style={{ display: 'inline' }}>
      <Moment format="D MMM YYYY" locale="de">
        {post.dateCreated}
      </Moment>
    </Typography>
  )
}

export default PostDetailsDate
