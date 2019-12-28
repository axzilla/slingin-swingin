import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPostsByTag, getPostsTags } from './_services'
import { postToggleLikes, postToggleBookmarks } from '../post/_services'
import PostFeedItem from './PostFeedItem'
import PostsByTagHeaderCard from './PostsByTagHeaderCard'
import WidgetTopPostsTags from '../../components/widgets/WidgetTopPostsTags'
import WidgetLatestUsers from '../../components/widgets/WidgetLatestUsers'
import { Button, Grid, Hidden } from '@material-ui/core'

function PostsByTag({ tag }) {
  const [posts, setPosts] = useState()
  const [postTags, setPostTags] = useState()
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    getInitialData()
  }, [tag])

  async function getInitialData() {
    try {
      const foundPostsByTag = await getPostsByTag(tag)
      const foundPostsTags = await getPostsTags()

      setPosts(foundPostsByTag.data)
      setPostTags(foundPostsTags.data)
    } catch (error) {
      if (error) throw error
    }
  }

  function loadMore() {
    setLimit(limit + 10)
  }

  async function onLikeClick(postId) {
    try {
      const updatedPost = await postToggleLikes(postId)

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost.data._id
        })[0]
      )

      setPosts([...posts.slice(0, index), updatedPost.data, ...posts.slice(index + 1)])
    } catch (error) {
      if (error) throw error
    }
  }

  async function onBookmarkClick(postId) {
    try {
      const updatedPost = await postToggleBookmarks(postId)

      const index = posts.indexOf(
        posts.filter(post => {
          return post._id === updatedPost.data._id
        })[0]
      )

      setPosts([...posts.slice(0, index), updatedPost.data, ...posts.slice(index + 1)])
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container>
      <Grid item xs>
        <PostsByTagHeaderCard tag={tag} />
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
  tag: PropTypes.string
}

export default PostsByTag
