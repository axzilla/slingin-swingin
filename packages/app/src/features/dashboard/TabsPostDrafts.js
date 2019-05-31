// Packages
import React, { useState } from 'react'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostDrafts = ({ postsDraftsByUserId, currentUserId }) => {
  const clickLocation = 'postsByUserId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = postsDraftsByUserId
    .slice(0, limit)
    .map((post, i) => (
      <PostFeedItem
        key={i}
        post={post}
        currentUserId={currentUserId}
        clickLocation={clickLocation}
      />
    ))

  return (
    <Grid>
      {content}
      {postsDraftsByUserId &&
      content.length === postsDraftsByUserId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostDrafts
