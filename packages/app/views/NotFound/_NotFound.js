import React from 'react'
import { NextLink } from '../../components'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  image: {
    width: '50%',
    marginBottom: theme.spacing(3)
  },
  container: {
    marginBottom: theme.spacing(5)
  }
}))

function NotFound() {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <img src="/404.png" className={classes.image} />
      <NextLink href="/">
        <Button variant="contained" color="primary">
          Zurück
        </Button>
      </NextLink>
    </Grid>
  )
}

export default NotFound
