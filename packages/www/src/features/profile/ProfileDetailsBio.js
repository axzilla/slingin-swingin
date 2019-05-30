// Packages
import React from 'react'

// Utils
import isEmpty from '../../utils/isEmpty'

// Material Core
import { Typography } from '@material-ui/core'

const ProfileDetailsBio = props => {
  const { profile } = props

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

export default ProfileDetailsBio
