// Packages
import React from 'react'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
import { Grid } from '@material-ui/core'

// Components
import ChangeEmailContainer from '../auth/container/ChangeEmailContainer'
import ChangePasswordContainer from '../auth/container/ChangePasswordContainer'
import ChangeUsernameContainer from '../auth/container/ChangeUsernameContainer'
import SettingsContainer from '../auth/container/SettingsContainer'

const useStyles = makeStyles({
  container: {
    marginBottom: '20px'
  }
})

function Settings() {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12} className={classes.container}>
        <ChangeEmailContainer />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <ChangePasswordContainer />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <ChangeUsernameContainer />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <SettingsContainer />
      </Grid>
    </Grid>
  )
}

export default Settings
