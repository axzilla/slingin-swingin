// Packages
import React from 'react'
import { Link } from 'react-router-dom'

//  Material Core
import { Typography } from '@material-ui/core'

const PostDetailsCreator = props => {
  const { post } = props

  let content = {}

  if (post.user === null) {
    content = <Typography>anonym</Typography>
  } else {
    content = (
      <Link to={`/${post.user.username}`}>
        <Typography color="primary" style={{ display: 'inline' }}>
          {post.user.username}
        </Typography>
      </Link>
    )
  }

  return <React.Fragment>{content}</React.Fragment>
}

export default PostDetailsCreator
