// Packages
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

// Features
import PostFeedItem from '../post/PostFeedItem'
import { getPosts } from '../post/_actions'

// Components
import CardPostsTopHashtags from '../../components/cards/CardPostsTopHashtags'
import CardSponsors from '../../components/cards/CardSponsors'
import CardLanding from '../../components/cards/CardLanding'
import CardUserLatest from '../../components/cards/CardUserLatest'

// Material Core
import { Button, Grid, Hidden } from '@material-ui/core'

const Landing = ({ auth, history, posts, getPosts }) => {
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

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
        {!auth.isAuthenticated ? <CardLanding /> : null}
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
          <CardUserLatest />
          <CardSponsors />
        </Grid>
      </Hidden>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    posts: state.post.posts
  }
}

const mapDispatchToProps = {
  getPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
