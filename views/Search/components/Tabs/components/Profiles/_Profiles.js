import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Spinner from '@components/Spinner'
import ProfileFeedItem from '@components/ProfileFeedItem'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function SearchProfileFeed({ searchResult }) {
  const [limit, setLimit] = useState(10)

  function loadMore() {
    setLimit(limit + 10)
  }

  let profileItems

  if (searchResult.profiles === null) {
    profileItems = <Spinner />
  } else {
    const location = 'getProfilesBySearch'
    profileItems = searchResult.profiles
      .slice(0, limit)
      .map(profile => <ProfileFeedItem location={location} key={profile._id} profile={profile} />)
  }

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        {profileItems}
        {searchResult.profiles && profileItems.length === searchResult.profiles.length ? null : (
          <Button onClick={loadMore} variant="outlined" color="primary">
            Mehr...
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

SearchProfileFeed.propTypes = {
  searchResult: PropTypes.object,
  searchString: PropTypes.string
}

export default SearchProfileFeed
