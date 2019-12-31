import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '../../../components'
import { Grid, Button } from '@material-ui/core'

function ProfileDetailsButtonEdit({ profile, auth }) {
  return (
    <Grid container>
      {auth.isAuthenticated && profile.user._id === auth.user.id ? (
        <Link href="/dashboard/profile">
          <Button size="small" variant="outlined">
            Bearbeiten
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
