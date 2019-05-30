// Packages
import React, { useState } from 'react'
import { connect } from 'react-redux'

// Features
import Spinner from '../common/Spinner'
import PostFeedItem from '../post/PostFeedItem'

// Material Core
import { Grid, Button } from '@material-ui/core'

const Posts = props => {
  const { postsByUserId } = props.post
  const [limit, setLimit] = useState(10)

  const loadMore = () => {
    setLimit(limit + 10)
  }

  const clickLocation = 'postsByUserId'
  let postContent

  if (postsByUserId === null) {
    postContent = <Spinner />
  } else {
    postContent = postsByUserId
      .slice(0, limit)
      .map((post, i) => (
        <PostFeedItem
          clickLocation={clickLocation}
          key={i}
          userPostsId={props.profile.user._id}
          post={post}
        />
      ))
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        {postContent}
        {postsByUserId && postContent.length === postsByUserId.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
})

export default connect(mapStateToProps)(Posts)
