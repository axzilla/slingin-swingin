import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { getPostsByTag, getPostsTags } from './_services'
import { handlePostLikes, handlePostBookmarks } from '../post/_services'
import PostFeedItem from './PostFeedItem'
import PostsByTagHeaderCard from './PostsByTagHeaderCard'
import WidgetTopPostsTags from '../../components/widgets/WidgetTopPostsTags'
import WidgetLatestUsers from '../../components/widgets/WidgetLatestUsers'
import { Button, Grid, Hidden } from '@material-ui/core'

function PostsByTag({ history, match }) {
  const [posts, setPosts] = useState()
  const [postTags, setPostTags] = useState()
  const [limit, setLimit] = useState(10)
  const [paramsTag, setParamsTag] = useState()

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

    setParamsTag()
  }, [match.params.tag])

  useEffect(() => {
    getPostsByTag(match.params.tag)
  }, [match.params.tag !== paramsTag])

  function loadMore() {
    setLimit(limit + 10)
  }

  function onLikeClick(postId) {
    handlePostLikes(postId).then(res => {
      const updatedPost = res.data

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setPosts([...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)])
    })
  }

  function onBookmarkClick(postId) {
    handlePostBookmarks(postId).then(res => {
      const updatedPost = res.data

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost._id
        })[0]
      )

      setPosts([...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)])
    })
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
                  key={post._id}
                  history={history}
                  post={post}
                  onLikeClick={onLikeClick}
                  onBookmarkClick={onBookmarkClick}
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
  history: PropTypes.object,
  match: PropTypes.object
}

export default PostsByTag
