// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'

// Services
import { getPosts } from '../post/_services'

// Contexts
import { useAuth } from '../../contexts/auth'

// Features
import PostFeedItem from '../post/PostFeedItem'

// Components
import CardPostsTopHashtags from '../../components/cards/CardPostsTopHashtags'
import CardSponsors from '../../components/cards/CardSponsors'
import CardLanding from '../../components/cards/CardLanding'
import CardUserLatest from '../../components/cards/CardUserLatest'

// Material Core
import { Button, Grid, Hidden } from '@material-ui/core'

const Landing = ({ history }) => {
  const { auth } = useAuth()
  const [limit, setLimit] = useState(10)
  const [posts, setPosts] = useState()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getPosts().then(res => {
      setPosts(res.data)
    })
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
          {posts &&
            posts
              .slice(0, limit)
              .map((post, i) => (
                <PostFeedItem
                  clickLocation={'allPosts'}
                  key={i}
                  post={post}
                  history={history}
                  auth={auth}
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

export default Landing
