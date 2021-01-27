// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// Global Components
import ProfileFeedItem from '@components/ProfileFeedItem'

// MUI
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import Pagination from '@material-ui/lab/Pagination'
import SearchIcon from '@material-ui/icons/Search'

function AllMembers({ users }) {
  const router = useRouter()
  const [limit] = useState(20)
  const [q, setQ] = useState(router.query.q || '')

  function handleSearchSubmit(e) {
    if (e.keyCode === 13) {
      if (q) {
        router.push({ pathname: '/all-members', query: { q, limit, page: 1 } })
      } else {
        router.push({ pathname: '/all-members', query: { limit, page: 1 } })
      }
    }
  }

  function handleSearchTextChange(e) {
    setQ(e.target.value)
  }

  function handlePaginationChange(page) {
    const { query } = router
    router.push({ pathname: '/all-members', query: { ...query, page, limit } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item xs>
            <TextField
              // fullWidth
              value={q}
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
          {/* <Grid item>
            <IconButton onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </Grid> */}
        </Grid>
      </Grid>
      {users.result.map(user => (
        <Grid key={user._id} item xs={12}>
          <ProfileFeedItem key={user._id} user={user} />
        </Grid>
      ))}
      {/* Pagination */}
      <Grid item xs={12}>
        <Box my={5}>
          <Grid container alignItems="center" justify="center">
            <Pagination
              page={users.page}
              size="large"
              count={users.pages}
              onChange={(e, page) => handlePaginationChange(page)}
            />
          </Grid>
        </Box>
        <Box>
          <Typography component="h3" variant="subtitle1" align="center">
            {users.from} – {users.to} of {users.total} digital nomads
          </Typography>
        </Box>
      </Grid>
      {/* Pagination END*/}
    </Grid>
  )
}

AllMembers.propTypes = {
  users: PropTypes.array.isRequired
}

export default AllMembers
