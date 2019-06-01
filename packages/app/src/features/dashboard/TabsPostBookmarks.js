// Packages
import React, { useState } from 'react'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostBookmarks = ({ postsByUserBookmark, auth }) => {
  const clickLocation = 'postsByUserBookmark'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = postsByUserBookmark
    .slice(0, limit)
    .map((post, i) => (
      <PostFeedItem
        key={i}
        post={post}
        auth={auth}
        clickLocation={clickLocation}
      />
    ))
  return (
    <Grid>
      {content}
      {postsByUserBookmark &&
      content.length === postsByUserBookmark.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostBookmarks
