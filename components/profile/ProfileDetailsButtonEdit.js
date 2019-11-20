import React from 'react'
import PropTypes from 'prop-types'
import LinkRouter from '../../components/LinkRouter'
import { Grid, Button } from '@material-ui/core'

function ProfileDetailsButtonEdit({ profile, auth }) {
  return (
    <Grid container>
      {auth.isAuthenticated && profile.user._id === auth.user.id ? (
        <LinkRouter href="/dashboard/profile">
          <Button size="small" variant="outlined">
            Bearbeiten
          </Button>
        </LinkRouter>
      ) : null}
    </Grid>
  )
}

ProfileDetailsButtonEdit.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfileDetailsButtonEdit
