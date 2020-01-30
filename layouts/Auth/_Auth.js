import React from 'react'
import PropTypes from 'prop-types'

import logo from './_logo.png'

import NextLink from '../../components/NextLink'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(5, 1, 0) },
  logo: { width: '150px', marginBottom: theme.spacing(5) }
}))

function Auth({ children }) {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <Grid
        style={{ width: '100%' }}
        className={classes.root}
        container
        alignItems="center"
        direction="column"
      >
        <NextLink href="/">
          <img className={classes.logo} src={logo} />
        </NextLink>
        {children}
      </Grid>
    </Container>
  )
}

Auth.propTypes = {
  children: PropTypes.node
}

export default Auth
