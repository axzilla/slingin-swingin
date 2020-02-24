import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@components/Spinner'
import ProfileFeedItem from '@components/ProfileFeedItem'

import Grid from '@material-ui/core/Grid'

function SearchProfileFeed({ searchResult }) {
  let profileItems

  if (searchResult.profiles === null) {
    profileItems = <Spinner />
  } else {
    const location = 'getProfilesBySearch'
    profileItems = searchResult.profiles.map(profile => (
      <ProfileFeedItem location={location} key={profile._id} profile={profile} />
    ))
  }

  return <Grid>{profileItems}</Grid>
}

SearchProfileFeed.propTypes = {
  searchResult: PropTypes.object
}

export default SearchProfileFeed
