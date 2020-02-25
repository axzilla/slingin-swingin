import React from 'react'
import PropTypes from 'prop-types'

import ProfileFeedItem from '@components/ProfileFeedItem'

import Grid from '@material-ui/core/Grid'

function SearchProfileFeed({ searchResult }) {
  return (
    <Grid container spacing={2}>
      {searchResult.profiles.map(profile => (
        <Grid key={profile._id} item xs={12}>
          <ProfileFeedItem key={profile._id} profile={profile} />
        </Grid>
      ))}
    </Grid>
  )
}

SearchProfileFeed.propTypes = {
  searchResult: PropTypes.object
}

export default SearchProfileFeed
