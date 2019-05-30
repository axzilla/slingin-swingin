// Packages
import React from 'react'
import { Link } from 'react-router-dom'

// Material Core
import { Grid, Button } from '@material-ui/core'

const ProfileDetailsButtonEdit = props => {
  const { profile, auth } = props

  return (
    <Grid container>
      {auth.isAuthenticated && profile.user._id === auth.user.id ? (
        <Link to="/dashboard/profile">
          <Button size="small" variant="outlined">
            Bearbeiten
          </Button>
        </Link>
      ) : null}
    </Grid>
  )
}

export default ProfileDetailsButtonEdit
