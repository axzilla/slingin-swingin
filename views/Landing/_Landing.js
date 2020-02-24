import React, { useState, useEffect } from 'react'

import { getPosts } from '@services/post'

import PostFeedItem from '@components/PostFeedItem'

import Grid from '@material-ui/core/Grid'

function Landing() {
  const [posts, setPosts] = useState()

  useEffect(() => {
    getInitalData()
  }, [])

  async function getInitalData() {
    try {
      const foundPosts = await getPosts()
      setPosts(foundPosts.data)
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <Grid container spacing={2}>
      {posts &&
        posts.map(post => (
          <Grid key={post._id} item xs={12}>
            <PostFeedItem post={post} />
          </Grid>
        ))}
    </Grid>
  )
}

export default Landing
