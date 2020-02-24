import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: '500',
    marginBottom: '-10px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}))

function ProfileDetailsName({ profile }) {
  const classes = useStyles()

  return (
    <Typography className={classes.name} variant="h2">
      {profile.firstName} {profile.lastName}
    </Typography>
  )
}

ProfileDetailsName.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsName
