// Packages
import React, { useState } from 'react'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostPosts = ({ post, profile }) => {
  const clickLocation = 'postsByUserId'

  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = post.postsByUserId
    .slice(0, limit)
    .map((post, i) => (
      <PostFeedItem
        key={i}
        post={post}
        userPostsId={profile.currentProfile.user._id}
        clickLocation={clickLocation}
      />
    ))

  return (
    <Grid>
      {content}
      {post.postsByUserId &&
      content.length === post.postsByUserId.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

export default TabsPostPosts
