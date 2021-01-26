// Packages
import React from 'react'

// Local Components
import { Notifications, Email, Password, Username } from './components'

import Grid from '@material-ui/core/Grid'

function Settings() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Email />
      </Grid>
      <Grid item xs={12}>
        <Username />
      </Grid>
      <Grid item xs={12}>
        <Password />
      </Grid>
      <Grid item xs={12}>
        <Notifications />
      </Grid>
    </Grid>
  )
}

export default Settings
