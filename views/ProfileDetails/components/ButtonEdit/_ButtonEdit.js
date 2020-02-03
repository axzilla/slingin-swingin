import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function ProfileDetailsButtonEdit({ profile, auth }) {
  return (
    <Grid container>
      {auth.isAuthenticated && profile.user._id === auth.user.id ? (
        <Link href="/dashboard/profile">
          <Button size="small" variant="outlined">
            Edit
          </Button>
        </Link>
      ) : null}
    </Grid>
  )
}

ProfileDetailsButtonEdit.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfileDetailsButtonEdit
