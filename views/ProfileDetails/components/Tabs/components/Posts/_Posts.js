import React from 'react'
import PropTypes from 'prop-types'

import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function Post({ posts }) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        {posts.map(post => (
          <PostFeedItem key={post._id} post={post} />
        ))}
      </Grid>
    </Grid>
  )
}

Post.propTypes = {
  posts: PropTypes.array
}

export default Post
