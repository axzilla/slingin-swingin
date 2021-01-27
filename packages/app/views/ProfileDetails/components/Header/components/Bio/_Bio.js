import React from 'react'
import PropTypes from 'prop-types'

import isEmpty from '@utils/isEmpty'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function ProfileDetailsBio({ user }) {
  return (
    <Box mb={3}>
      <Typography variant="body1" gutterBottom>
        {isEmpty(user.bio) ? 'did not write anything in the bio...' : user.bio}
      </Typography>
    </Box>
  )
}

ProfileDetailsBio.propTypes = {
  user: PropTypes.object
}

export default ProfileDetailsBio
