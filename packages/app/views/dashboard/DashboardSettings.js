import React from 'react'

import EmailChange from '../auth/EmailChange'
import PasswordChange from '../auth/PasswordChange'
import UsernameChange from '../auth/UsernameChange'
import Settings from '../auth/Settings'

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
        <EmailChange />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <PasswordChange />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <UsernameChange />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <Settings />
      </Grid>
    </Grid>
  )
}

export default DashboardSettings
