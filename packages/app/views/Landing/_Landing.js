// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Redux
import { signInReducer } from '@slices/authSlice'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Global Components
import PostFeedItem from '@components/PostFeedItem'
// import PostForm from '@components/PostForm'

// MUI
import Grid from '@material-ui/core/Grid'

import TextField from '@material-ui/core/TextField'

import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import SearchIcon from '@material-ui/icons/Search'

function Landing({ posts, message, variant, jwtToken }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const [limit] = useState(20)
  const [searchText, setSearchText] = useState(router.query.searchText || '')

  useEffect(() => {
    if (message && variant) {
      setAlert({ message, variant })
      jwtToken && dispatch(signInReducer(jwtToken))
    }
  }, [])

  function handleSearchSubmit(e) {
    if (e.keyCode === 13) {
      if (searchText) {
        router.push({ pathname: '/', query: { searchText, limit, page: 1 } })
      } else {
        router.push({ pathname: '/', query: { limit, page: 1 } })
      }
    }
  }

  function handleSearchTextChange(e) {
    setSearchText(e.target.value)
  }

  function handlePaginationChange(page) {
    const { query } = router
    router.push({ pathname: '/', query: { ...query, page, limit } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs>
            <TextField
              // fullWidth
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={handleSearchSubmit}
              margin="dense"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {posts &&
        posts.result.map(post => (
          <Grid key={post._id} item xs={12}>
            <PostFeedItem post={post} />
          </Grid>
        ))}
      {/* Pagination */}
      <Grid item xs={12}>
        <Box my={5}>
          <Grid container alignItems="center" justify="center">
            <Pagination
              siblingCount={0}
              page={posts.page}
              count={posts.pages}
              onChange={(e, page) => handlePaginationChange(page)}
            />
          </Grid>
        </Box>
        <Box>
          <Typography component="h3" variant="subtitle1" align="center">
            {posts.from} – {posts.to} of {posts.total} posts for digital nomads
          </Typography>
        </Box>
      </Grid>
      {/* Pagination END*/}
    </Grid>
  )
}

Landing.propTypes = {
  posts: PropTypes.object.isRequired,
  message: PropTypes.string,
  variant: PropTypes.string,
  jwtToken: PropTypes.string
}

export default Landing
