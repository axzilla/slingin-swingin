import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'

function PostDetailsLikes({ onLikeClick, post, user }) {
  return (
    <Grid container alignItems="center">
      <IconButton disableRipple onClick={() => onLikeClick(post._id)}>
        {post.likes.includes(user.id) ? (
          <FavoriteIcon color="secondary" />
        ) : (
          <FavoriteIcon color="primary" />
        )}
      </IconButton>
      <Typography>{post.likes && post.likes.length}</Typography>
    </Grid>
  )
}

PostDetailsLikes.propTypes = {
  onLikeClick: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.object
}

export default PostDetailsLikes
