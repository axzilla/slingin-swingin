import React from 'react'

import { Subscriptions, ChangeEmail, ChangePassword, ChangeUsername } from './components'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

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
        <Subscriptions />
      </Grid>
    </Grid>
  )
}

export default DashboardSettings
