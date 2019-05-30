// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

// Actions
import { getPostsByTag } from './_actions'

// Features
import PostFeedItem from './PostFeedItem'
import PostsByTagHeaderCard from './PostsByTagHeaderCard'

// Components
import Spinner from '../common/Spinner'
import CardPostsTopHashtags from '../../components/cards/CardPostsTopHashtags'
import CardSponsors from '../../components/cards/CardSponsors'

// Material Core
import { Button, Grid, Hidden } from '@material-ui/core'

const PostsByTag = props => {
  const { history, posts, getPostsByTag, isLoading } = props

  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    getPostsByTag(props.match.params.tag)
  }, [])

  useEffect(() => {
    getPostsByTag(props.match.params.tag)
  }, [props.match.params.tag])

  const loadMore = () => {
    setLimit(limit + 10)
  }

  let postContent

  if (isLoading) {
    postContent = <Spinner />
  } else {
    postContent = posts
      .slice(0, limit)
      .map((post, i) => (
        <PostFeedItem
          clickLocation={'allPosts'}
          key={i}
          post={post}
          history={history}
        />
      ))
  }

  return (
    <Grid container>
      <Grid item xs>
        <PostsByTagHeaderCard {...props} />
      </Grid>
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
          {postContent}
          {posts && postContent.length === posts.length ? null : (
            <Button onClick={loadMore} variant="outlined" color="primary">
              Mehr...
            </Button>
          )}
        </Grid>
        <Hidden smDown>
          <Grid item xs={3}>
            <CardSponsors />
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    posts: state.post.postsByTag
  }
}

const mapDispatchToProps = {
  getPostsByTag
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByTag)
