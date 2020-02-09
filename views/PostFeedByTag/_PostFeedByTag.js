import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Header } from './components'
import { getPostsByTag } from '@services/post'
import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function PostFeedByTag({ tag }) {
  const [posts, setPosts] = useState()

  useEffect(() => {
    getInitialData()
  }, [tag])

  async function getInitialData() {
    try {
      const foundPostsByTag = await getPostsByTag(tag)

      setPosts(foundPostsByTag.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid>
      <Header tag={tag} />
      {posts && posts.map(post => <PostFeedItem key={post._id} post={post} />)}
    </Grid>
  )
}

PostFeedByTag.propTypes = {
  tag: PropTypes.string
}

export default PostFeedByTag
