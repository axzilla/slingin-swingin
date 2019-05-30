import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    height: '300px',
    margin: theme.spacing(2)
  }
})

function CircularIndeterminate(props) {
  const { classes } = props
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <CircularProgress className={classes.progress} size={100} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(CircularIndeterminate)
