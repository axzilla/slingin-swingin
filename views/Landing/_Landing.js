import React, { useState, useEffect } from 'react'

import { setGaPageView } from '@utils/googleAnalytics'
import { getPosts } from '@services/post'

import Container from '@components/Container'
import PostFeedItem from '@components/PostFeedItem'
import WidgetLatestUsers from '@components/WidgetLatestUsers'
import WidgetTopPostsTags from '@components/WidgetTopPostsTags'

import Grid from '@material-ui/core/Grid'

function Landing() {
  const [posts, setPosts] = useState()

  useEffect(() => {
    getInitalData()
    setGaPageView()
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
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} md={3}>
          <WidgetTopPostsTags />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {posts &&
              posts.map(post => (
                <Grid key={post._id} item xs={12}>
                  <PostFeedItem post={post} />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <WidgetLatestUsers />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Landing
