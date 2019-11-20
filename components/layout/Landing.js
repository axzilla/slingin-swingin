import React, { useState, useEffect, useContext } from 'react'
import ReactGA from 'react-ga'
import { handlePostLikes, handlePostBookmarks } from '../post/_services'
import { getPosts } from '../post/_services'
import AuthContext from '../../contexts/AuthContext'

import PostFeedItem from '../post/PostFeedItem'
import WidgetLatestUsers from '../../components/widgets/WidgetLatestUsers'
import WidgetTopPostsTags from '../../components/widgets/WidgetTopPostsTags'
import WidgetSidebarRight from '../../components/widgets/WidgetSidebarRight'
import WidgetSidebarLeft from '../../components/widgets/WidgetSidebarLeft'
import LandingWelcome from './LandingWelcome'

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
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    getPosts().then(res => {
      setPosts(res.data)
    })
  }, [])

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
        {!isAuthenticated ? <LandingWelcome /> : null}
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
