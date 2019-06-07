// Packages
import React, { useState } from 'react'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostPosts = ({ postsByUserId, auth }) => {
  const clickLocation = 'postsByUserId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content =
    postsByUserId &&
    postsByUserId
      .slice(0, limit)
      .map(post => (
        <PostFeedItem key={post._id} post={post} auth={auth} clickLocation={clickLocation} />
      ))

  return (
    <Grid>
      {content}
      {postsByUserId && content.length === postsByUserId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostPosts
