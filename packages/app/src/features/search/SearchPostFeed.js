// Packages
import React, { useState } from 'react'

// Features
import Spinner from '../common/Spinner'
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const SearchPostFeed = props => {
  const { posts, searchString } = props
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
      .map((post, i) => (
        <PostFeedItem
          clickLocation={clickLocation}
          key={i}
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

export default SearchPostFeed
