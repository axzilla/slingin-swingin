// Packages
import React from 'react'
import { connect } from 'react-redux'

// Actions
import { handleUserFollower } from './_services'

// Material Core
import { Grid, Button } from '@material-ui/core'

const ProfileDetails = props => {
  const { auth, profile } = props

  const onFollowButtonclick = () => {
    const location = 'profileDetails'

    props.handleUserFollower(location, profile.user._id, profile.user._id, profile.handle)
  }

  return (
    <Grid container>
      {auth.isAuthenticated && profile.user._id !== auth.user.id ? (
        <Button size="small" onClick={onFollowButtonclick} variant="outlined">
          {profile.user.follower.map(follower => follower.user).includes(auth.user.id) ? (
            <span>
              <i className="fas fa-user-check" /> Entfolgen
            </span>
          ) : (
            <span>
              <i className="fas fa-user-plus" /> Folgen
            </span>
          )}
        </Button>
      ) : null}
    </Grid>
  )
}
const mapDispatchToProps = {
  handleUserFollower
}

export default connect(
  null,
  mapDispatchToProps
)(ProfileDetails)
