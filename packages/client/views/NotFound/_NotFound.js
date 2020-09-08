import React from 'react'

import image404 from './_404.svg'

import Link from '@components/Link'
import Container from '@components/Container'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  image: {
    maxHeight: '70vh',
    marginBottom: theme.spacing(5)
  },
  container: {
    marginBottom: theme.spacing(5)
  }
}))

function NotFound() {
  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <img src={image404} className={classes.image} />
        <Link href="/">
          <Button variant="contained" color="secondary">
            Back
          </Button>
        </Link>
      </Grid>
    </Container>
  )
}

export default NotFound
