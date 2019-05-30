// Packages
import React from 'react'
import { connect } from 'react-redux'

// Actions
import { handleUserFollower } from './_actions'

// Components
import Button from '../button/Button'

const ProfilesCardFollowButton = props => {
  const { profile, auth } = props

  const onFollowButtonclick = () => {
    if (
      props.profile.user.follower
        .map(follower => follower.user)
        .includes(props.auth.user.id)
    ) {
      if (window.confirm('Nicht mehr folgen?')) {
        props.handleUserFollower(props.profile.user._id, props.profile.handle)
      }
    } else {
      props.handleUserFollower(props.profile.user._id, props.profile.handle)
    }
  }

  return (
    <React.Fragment>
      {auth.isAuthenticated && profile.user._id !== auth.user.id ? (
        <Button onClick={onFollowButtonclick}>
          {profile.user.follower
            .map(follower => follower.user)
            .includes(props.auth.user.id) ? (
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { handleUserFollower }
)(ProfilesCardFollowButton)
