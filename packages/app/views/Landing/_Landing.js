// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

// Redux
import { signInReducer } from '@slices/authSlice'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { getPosts } from '@services/post'

// Global Components
import PostFeedItem from '@components/PostFeedItem'

// MUI
import Grid from '@material-ui/core/Grid'

function Landing({ alertMessage, jwtToken }) {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const [posts, setPosts] = useState()

  useEffect(() => {
    getInitalData()

    if (alertMessage) {
      setAlert({ message: alertMessage })
      jwtToken && dispatch(signInReducer(jwtToken))
    }
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

Landing.propTypes = {
  alertMessage: PropTypes.string,
  jwtToken: PropTypes.string
}

export default Landing
