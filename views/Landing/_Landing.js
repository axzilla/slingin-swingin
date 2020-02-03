import React, { useState, useEffect } from 'react'

import { setGaPageView } from '@utils/googleAnalytics'
import { getPosts } from '@services/post'

import Container from '@components/Container'
import PostFeedItem from '@components/PostFeedItem'
import WidgetLatestUsers from '@components/WidgetLatestUsers'
import WidgetTopPostsTags from '@components/WidgetTopPostsTags'
import WidgetSidebarRight from '@components/WidgetSidebarRight'
import WidgetSidebarLeft from '@components/WidgetSidebarLeft'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import CloudIcon from '@material-ui/icons/Cloud'
import FolderSharedIcon from '@material-ui/icons/FolderShared'

function Landing() {
  const [limit, setLimit] = useState(10)
  const [posts, setPosts] = useState()
  const [state, setState] = useState({
    left: false,
    right: false
  })

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

  function loadMore() {
    setLimit(limit + 10)
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [side]: open })
  }

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
        <Hidden smDown>
          <Grid item xs={3}>
            <WidgetTopPostsTags />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <Hidden mdUp>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <IconButton onClick={toggleDrawer('left', true)}>
                <CloudIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer('right', true)}>
                <FolderSharedIcon />
              </IconButton>
            </Grid>
            <WidgetSidebarRight state={state} setState={setState} toggleDrawer={toggleDrawer} />
            <WidgetSidebarLeft state={state} setState={setState} toggleDrawer={toggleDrawer} />
          </Hidden>
          <Grid item xs={12}>
            {posts &&
              posts.slice(0, limit).map(post => <PostFeedItem key={post._id} post={post} />)}
            {posts && posts.slice(0, limit).length === posts.length ? null : (
              <Button onClick={loadMore} variant="outlined" color="primary">
                Mehr...
              </Button>
            )}
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item xs={3}>
            <WidgetLatestUsers />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  )
}

export default Landing
