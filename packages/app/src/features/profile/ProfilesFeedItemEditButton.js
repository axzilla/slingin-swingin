import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from '../button/Button'

const ProfilesFeedItemEditButton = ({ profile, auth }) => {
  return (
    <React.Fragment>
      {auth.isAuthenticated && profile.user._id === auth.user.id ? (
        <Link to="/edit-profile">
          <Button>Bearbeiten</Button>
        </Link>
      ) : null}
    </React.Fragment>
  )
}

ProfilesFeedItemEditButton.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default ProfilesFeedItemEditButton
