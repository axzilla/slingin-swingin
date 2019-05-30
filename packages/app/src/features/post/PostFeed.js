// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

// Actions
import { getPosts, setPostLoading } from '../_actions'

// Features
import PostFeedItem from './PostFeedItem'

// Components
import CardPostsTopHashtags from '../../components/cards/CardPostsTopHashtags'
import CardSponsors from '../../components/cards/CardSponsors'
import CardLanding from '../../components/cards/CardLanding'

// Material Core
import { Button, Grid, Hidden } from '@material-ui/core'

const PostFeed = props => {
  const { history, posts, getPosts, setPostLoading } = props

  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    setPostLoading(true)
    getPosts()
  }, [])

  const loadMore = () => {
    setLimit(limit + 10)
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      <Hidden smDown>
        <Grid item xs={3}>
          <CardPostsTopHashtags />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        {!props.auth.isAuthenticated ? <CardLanding /> : null}
        <Grid item xs={12}>
          {posts.slice(0, limit).map((post, i) => (
            <PostFeedItem
              clickLocation={'allPosts'}
              key={i}
              post={post}
              history={history}
            />
          ))}
          {posts && posts.slice(0, limit).length === posts.length ? null : (
            <Button onClick={loadMore} variant="outlined" color="primary">
              Mehr...
            </Button>
          )}
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item xs={3}>
          <CardSponsors />
        </Grid>
      </Hidden>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    posts: state.post.posts,
    isLoading: state.post.isLoading
  }
}

const mapDispatchToProps = {
  getPosts,
  setPostLoading
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeed)
