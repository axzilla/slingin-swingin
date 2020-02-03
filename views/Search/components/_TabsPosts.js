import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '../../../components'
import { PostFeedItem } from '../../../components'
import { Grid, Button } from '@material-ui/core'

function SearchPostFeed({ searchResult }) {
  const [limit, setLinmit] = useState(10)
  const { posts } = searchResult

  function loadMore() {
    setLinmit(limit + 10)
  }

  let postContent
  if (posts === null) {
    postContent = <Spinner />
  } else {
    postContent = searchResult.posts
      .slice(0, limit)
      .map(post => <PostFeedItem key={post._id} post={post} />)
  }

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} sm={6}>
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
  posts: PropTypes.array,
  searchString: PropTypes.string,
  searchResult: PropTypes.object,
  setSearchResult: PropTypes.func
}

export default SearchPostFeed
