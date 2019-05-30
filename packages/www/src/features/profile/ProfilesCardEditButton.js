// Packages
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Button from '../button/Button'

const ProfilesCardEditButton = props => {
  const { profile, auth } = props

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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ProfilesCardEditButton)
