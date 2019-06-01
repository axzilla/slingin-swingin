// Packages
import React from 'react'

// Material Core
import { Typography, Button } from '@material-ui/core'

// Material Colors
import { red } from '@material-ui/core/colors'

const PostDetailsLikes = ({ onLikeClick, post, auth }) => {
  return (
    <Button
      disableRipple
      onClick={() => onLikeClick(post._id)}
      style={{ color: red[500] }}
    >
      {post.likes.map(like => like.user).includes(auth.user.id) ? (
        <i className="fas fa-heart fa-lg" />
      ) : (
        <i className="far fa-heart fa-lg" />
      )}
      &nbsp;
      <Typography>{post.likes && post.likes.length}</Typography>
    </Button>
  )
}

export default PostDetailsLikes
