import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  progress: {
    height: '300px',
    margin: theme.spacing(2)
  }
}))

function CircularIndeterminate() {
  const classes = useStyles()
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <CircularProgress className={classes.progress} size={100} />
      </Grid>
    </Grid>
  )
}

export default CircularIndeterminate
