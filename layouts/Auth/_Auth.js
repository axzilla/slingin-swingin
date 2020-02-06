import React from 'react'
import PropTypes from 'prop-types'

import logo from './_logo.svg'

import Link from '@components/Link'
import Container from '@components/Container'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(5, 1, 0) },
  logo: { height: '50px', marginBottom: theme.spacing(5) }
}))

function Auth({ children }) {
  const classes = useStyles()

  return (
    <Container maxWidth="xs">
      <Grid className={classes.root} container alignItems="center" direction="column">
        <Link href="/">
          <img className={classes.logo} src={logo} />
        </Link>
        {children}
      </Grid>
    </Container>
  )
}

Auth.propTypes = {
  children: PropTypes.node
}

export default Auth
