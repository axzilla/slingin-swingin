import React from 'react'
import { Link } from '../../components'
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
      <Link href="/">
        <Button variant="contained" color="primary">
          Zurück
        </Button>
      </Link>
    </Grid>
  )
}

export default NotFound
