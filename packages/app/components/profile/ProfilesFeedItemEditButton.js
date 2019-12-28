import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../components/LinkRouter'
import Button from '../button/Button'

function ProfilesFeedItemEditButton({ profile, auth }) {
  return (
    <React.Fragment>
      {auth.isAuthenticated && profile.user._id === auth.user.id ? (
        <LinkRouter href="/edit-profile">
          <Button>Bearbeiten</Button>
        </LinkRouter>
      ) : null}
    </React.Fragment>
  )
}

ProfilesFeedItemEditButton.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfilesFeedItemEditButton
