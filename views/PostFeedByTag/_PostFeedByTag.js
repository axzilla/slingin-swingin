import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPostsByTag, getPostsTags } from '../../services/post'
import { Header } from './components'
import { PostFeedItem, WidgetTopPostsTags, WidgetLatestUsers } from '../../components'

import { Button, Grid, Hidden } from '@material-ui/core'

function PostFeedByTag({ tag }) {
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

  return (
    <Grid container>
      <Grid item xs>
        <Header tag={tag} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
        <Hidden smDown>
          <Grid item xs={3}>
            <WidgetTopPostsTags postTags={postTags} />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          {posts && posts.slice(0, limit).map(post => <PostFeedItem key={post._id} post={post} />)}
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

PostFeedByTag.propTypes = {
  tag: PropTypes.string
}

export default PostFeedByTag
