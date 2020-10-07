// Packages
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// Global Components
import Link from '@components/Link'
import Container from '@components/Container'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(5, 1, 0) },
  logo: { height: '50px', marginBottom: theme.spacing(5) }
}))

function Auth({ children }) {
  const classes = useStyles()
  const { isDarkTheme } = useSelector(state => state.theme)

  return (
    <Container maxWidth="xs">
      <Grid className={classes.root} container alignItems="center" direction="column">
        <Link href="/">
          <img
            className={classes.logo}
            src={isDarkTheme ? '/_logo_full_light.svg' : '/_logo_full_dark.svg'}
          />
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
