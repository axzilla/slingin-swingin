import React from 'react'
import PropTypes from 'prop-types'

import { handleUserFollower } from './_services'

import { Grid, Button } from '@material-ui/core'

const ProfileDetailsButtonFollow = ({ auth, profile, setProfile }) => {
  const onFollowButtonclick = () => {
    handleUserFollower(profile.user._id).then(res => {
      setProfile(res.data)
    })
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

ProfileDetailsButtonFollow.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired
}

export default ProfileDetailsButtonFollow
