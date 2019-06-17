import React from 'react'
import ReactGA from 'react-ga'
import notFound from '../../assets/img/404.png'
import LinkRouter from '../LinkRouter'
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
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <img src={notFound} className={classes.image} />
      <LinkRouter to="/">
        <Button variant="contained" color="primary">
          Zurück
        </Button>
      </LinkRouter>
    </Grid>
  )
}

export default NotFound
