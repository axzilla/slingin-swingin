import React, { useState, useEffect, useContext } from 'react'

import { setGaPageView } from '../../utils/googleAnalytics'

import { postToggleLikes, postToggleBookmarks, getPosts } from '../../services/post'
import AuthContext from '../../contexts/AuthContext'

import {
  PostFeedItem,
  WidgetLatestUsers,
  WidgetTopPostsTags,
  WidgetSidebarRight,
  WidgetSidebarLeft
} from '../../components'
import { Welcome } from './components'

import { Button, Grid, Hidden } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloudIcon from '@material-ui/icons/Cloud'
import FolderSharedIcon from '@material-ui/icons/FolderShared'

function Landing() {
  const { isAuthenticated } = useContext(AuthContext)
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

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [side]: open })
  }

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
      <Hidden smDown>
        <Grid item xs={3}>
          <WidgetTopPostsTags />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        {!isAuthenticated ? <Welcome /> : null}
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
      </Grid>
      <Hidden smDown>
        <Grid item xs={3}>
          <WidgetLatestUsers />
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Landing
