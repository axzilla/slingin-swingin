import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

function ProfileDetailsUsername({ user }) {
  return (
    <>
      <Typography variant="h4">Hi, I’m {user.name}</Typography>
      <Typography color="textSecondary">@{user.username}</Typography>
    </>
  )
}

ProfileDetailsUsername.propTypes = {
  user: PropTypes.object
}

export default ProfileDetailsUsername
