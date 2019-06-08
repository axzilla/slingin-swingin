// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const TabsPostBookmarks = ({ postsByUserBookmark, auth }) => {
  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const content = postsByUserBookmark
    .slice(0, limit)
    .map(post => <PostFeedItem key={post._id} post={post} auth={auth} />)
  return (
    <Grid>
      {content}
      {postsByUserBookmark && content.length === postsByUserBookmark.length ? null : (
        <Button onClick={loadMore} variant="outlined" color="primary">
          Mehr...
        </Button>
      )}
    </Grid>
  )
}

TabsPostBookmarks.propTypes = {
  postsByUserBookmark: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}

export default TabsPostBookmarks
