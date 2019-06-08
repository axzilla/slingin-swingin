import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../common/Spinner'
import PostFeedItem from '../post/PostFeedItem'

import { Grid, Button } from '@material-ui/core'

const SearchPostFeed = ({ posts, searchString }) => {
  const [limit, setLinmit] = useState(10)

  const loadMore = () => {
    setLinmit(limit + 10)
  }

  let postContent

  if (posts === null) {
    postContent = <Spinner />
  } else {
    const clickLocation = 'getPostsBySearch'
    postContent = posts
      .slice(0, limit)
      .map(post => (
        <PostFeedItem
          clickLocation={clickLocation}
          key={post._id}
          post={post}
          searchString={searchString}
        />
      ))
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        {postContent}
        {posts && postContent.length === posts.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

SearchPostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  searchString: PropTypes.string.isRequired
}

export default SearchPostFeed
