// Packages
import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Grid } from '@material-ui/core'

import ChangeEmail from '../auth/ChangeEmail'
import ChangePassword from '../auth/ChangePassword'
import ChangeUsername from '../auth/ChangeUsername'
import Settings from '../auth/Settings'

const useStyles = makeStyles({
  container: {
    marginBottom: '20px'
  }
})

function DashboardSettings() {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12} className={classes.container}>
        <ChangeEmail />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <ChangePassword />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <ChangeUsername />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <Settings />
      </Grid>
    </Grid>
  )
}

export default DashboardSettings
