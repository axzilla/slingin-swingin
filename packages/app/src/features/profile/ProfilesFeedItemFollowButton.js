import React from 'react'
import PropTypes from 'prop-types'

import { handleUserFollower } from './_services'

import Button from '../button/Button'

const ProfilesFeedItemFollowButton = ({ profile, auth }) => {
  const onFollowButtonclick = () => {
    if (profile.user.follower.map(follower => follower.user).includes(auth.user.id)) {
      if (window.confirm('Nicht mehr folgen?')) {
        handleUserFollower(profile.user._id, profile.handle)
      }
    } else {
      handleUserFollower(profile.user._id, profile.handle)
    }
  }

  return (
    <React.Fragment>
      {auth.isAuthenticated && profile.user._id !== auth.user.id ? (
        <Button onClick={onFollowButtonclick}>
          {profile.user.follower.map(follower => follower.user).includes(auth.user.id) ? (
            <span key="followed">
              <i className="fas fa-user-check" /> Entfolgen
            </span>
          ) : (
            <span key="notfollowed">
              <i className="fas fa-user-plus" /> Folgen
            </span>
          )}
        </Button>
      ) : null}
    </React.Fragment>
  )
}

ProfilesFeedItemFollowButton.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default ProfilesFeedItemFollowButton
