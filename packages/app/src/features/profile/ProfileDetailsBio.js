import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../utils/isEmpty'
import { Typography } from '@material-ui/core'

function ProfileDetailsBio({ profile }) {
  return (
    <Typography gutterBottom>
      {isEmpty(profile.bio) ? (
        <React.Fragment>hat nichts über sich geschrieben...</React.Fragment>
      ) : (
        <React.Fragment>{profile.bio}</React.Fragment>
      )}
    </Typography>
  )
}

ProfileDetailsBio.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsBio
