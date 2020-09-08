import React from 'react'
import PropTypes from 'prop-types'

import isEmpty from '@utils/isEmpty'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function ProfileDetailsBio({ profile }) {
  return (
    <Box mb={3}>
      <Typography variant="body1" gutterBottom>
        {isEmpty(profile.bio) ? 'did not write anything in the bio...' : profile.bio}
      </Typography>
    </Box>
  )
}

ProfileDetailsBio.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsBio
