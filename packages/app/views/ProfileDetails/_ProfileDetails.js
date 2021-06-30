// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// Local Components
import Header from './components/Header'
import SendMessage from './components/SendMessage'
import Tabs from './components/Tabs'
import Map from './components/Map'

// MUI
import Grid from '@material-ui/core/Grid'

function ProfileDetails({ user, posts, comments }) {
  const { currentUser, isAuthenticated } = useSelector(state => state.auth)

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Header user={user} />
      </Grid>
      <Grid item xs={12}>
        <Map lng={user.location.center[0]} lat={user.location.center[1]} />
      </Grid>
      {isAuthenticated && user._id !== currentUser._id && (
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <SendMessage receiverUsername={user.username} receiver={user._id} />
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Tabs posts={posts} comments={comments} />
      </Grid>
    </Grid>
  )
}

ProfileDetails.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  comments: PropTypes.array
}

export default ProfileDetails
