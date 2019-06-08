import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Button } from '@material-ui/core'

import { red } from '@material-ui/core/colors'

function PostDetailsLikes({ onLikeClick, post, auth }) {
  return (
    <Button disableRipple onClick={() => onLikeClick(post._id)} style={{ color: red[500] }}>
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

PostDetailsLikes.propTypes = {
  onLikeClick: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default PostDetailsLikes
