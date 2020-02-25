import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function ProfileDetailsName({ profile }) {
  return (
    <Typography variant="h5" gutterBottom align="center">
      {profile.firstName} {profile.lastName}
    </Typography>
  )
}

ProfileDetailsName.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsName
