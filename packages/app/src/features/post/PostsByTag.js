// Packages
import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'

// Contexts
import { useAuth } from '../../contexts/auth'

// Actions
import { getPostsByTag, getPostsTags } from './_services'

// Features
import PostFeedItem from './PostFeedItem'
import PostsByTagHeaderCard from './PostsByTagHeaderCard'

// Components
import Spinner from '../common/Spinner'
import WidgetTopPostsTags from '../../components/widgets/WidgetTopPostsTags'

// Material Core
import { Button, Grid, Hidden } from '@material-ui/core'

const PostsByTag = props => {
  const { auth } = useAuth()
  const { history, isLoading } = props
  const [posts, setPosts] = useState()
  const [postTags, setPostTags] = useState()
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    getPostsByTag(props.match.params.tag).then(res => {
      setPosts(res.data)
    })

    getPostsTags().then(res => {
      setPostTags(res.data)
    })
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
    postContent =
      posts &&
      posts
        .slice(0, limit)
        .map((post, i) => (
          <PostFeedItem
            clickLocation={'allPosts'}
            key={post._id}
            post={post}
            history={history}
            auth={auth}
          />
        ))
  }

  return (
    <Grid container>
      <Grid item xs>
        <PostsByTagHeaderCard {...props} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
        <Hidden smDown>
          <Grid item xs={3}>
            <WidgetTopPostsTags postTags={postTags} />
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
          <Grid item xs={3} />
        </Hidden>
      </Grid>
    </Grid>
  )
}

export default PostsByTag
