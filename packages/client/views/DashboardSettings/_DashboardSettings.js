import React from 'react'

import Subscriptions from './components/Subscriptions'
import ChangeEmail from './components/ChangeEmail'
import ChangePassword from './components/ChangePassword'
import ChangeUsername from './components/ChangeUsername'

import Grid from '@material-ui/core/Grid'

function DashboardSettings() {
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <ChangeEmail />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChangeUsername />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChangePassword />
      </Grid>
      <Grid item md={6} xs={12}>
        <Subscriptions />
      </Grid>
    </Grid>
  )
}

export default DashboardSettings
