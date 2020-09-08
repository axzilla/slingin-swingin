import React from 'react'
import PropTypes from 'prop-types'

import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function SearchPostFeed({ searchResult }) {
  return (
    <Grid container spacing={2}>
      {searchResult.posts.map(post => (
        <Grid key={post._id} item xs={12}>
          <PostFeedItem key={post._id} post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

SearchPostFeed.propTypes = {
  searchResult: PropTypes.object
}

export default SearchPostFeed
