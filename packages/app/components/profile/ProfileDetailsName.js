import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../utils/isEmpty'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: '500',
    marginBottom: '-10px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}))

function ProfileDetailsName({ profile, rgbaColor }) {
  const classes = useStyles()

  return (
    <Typography
      className={classes.name}
      variant="h2"
      style={{
        color: !isEmpty(profile.color) ? `${rgbaColor}` : null
      }}
    >
      {profile.name}
    </Typography>
  )
}

ProfileDetailsName.propTypes = {
  profile: PropTypes.object,
  rgbaColor: PropTypes.string
}

export default ProfileDetailsName
