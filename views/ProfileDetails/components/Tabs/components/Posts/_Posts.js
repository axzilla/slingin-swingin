import React from 'react'
import PropTypes from 'prop-types'

import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function Post({ posts }) {
  return (
    <Grid container spacing={2}>
      {posts.map(post => (
        <Grid key={post._id} item xs={12}>
          <PostFeedItem post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

Post.propTypes = {
  posts: PropTypes.array
}

export default Post
