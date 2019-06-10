import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import { useAuth } from '../../contexts/auth'
import { getPostsByTag, getPostsTags } from './_services'

import PostFeedItem from './PostFeedItem'
import PostsByTagHeaderCard from './PostsByTagHeaderCard'
import WidgetTopPostsTags from '../../components/widgets/WidgetTopPostsTags'
import WidgetLatestUsers from '../../components/widgets/WidgetLatestUsers'

import { Button, Grid, Hidden } from '@material-ui/core'

const PostsByTag = ({ history, match }) => {
  const { auth } = useAuth()
  const [posts, setPosts] = useState()
  const [postTags, setPostTags] = useState()
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    getPostsByTag(match.params.tag).then(res => {
      setPosts(res.data)
    })

    getPostsTags().then(res => {
      setPostTags(res.data)
    })
  }, [])

  useEffect(() => {
    getPostsByTag(match.params.tag)
  }, [match.params.tag])

  const loadMore = () => {
    setLimit(limit + 10)
  }

  return (
    <Grid container>
      <Grid item xs>
        <PostsByTagHeaderCard match={match} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
        <Hidden smDown>
          <Grid item xs={3}>
            <WidgetTopPostsTags postTags={postTags} />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          {posts &&
            posts
              .slice(0, limit)
              .map(post => (
                <PostFeedItem
                  clickLocation={'allPosts'}
                  key={post._id}
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
        <Hidden smDown>
          <Grid item xs={3}>
            <WidgetLatestUsers />
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  )
}

PostsByTag.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default PostsByTag
