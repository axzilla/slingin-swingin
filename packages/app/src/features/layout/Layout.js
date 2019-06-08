import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Footer from './Footer'
import Toolbar from './Toolbar'
import Alert from '../common/Alert'

import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { CssBaseline, Grid } from '@material-ui/core'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#cfd8dc'
    }
  },
  typography: {
    useNextVariants: true
  }
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#212121'
    }
  },
  typography: {
    useNextVariants: true
  }
})

function Layout({ children, history }) {
  const classes = useStyles()
  const [isDashboardUrl, setIsDashboardUrl] = useState(
    history.location.pathname.includes('dashboard')
  )
  const [isLightTheme, setIsLightTheme] = useState(true)

  const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    control: {
      padding: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        padding: !isDashboardUrl ? `${theme.spacing(2)}px ${theme.spacing(18)}px` : null
      }
    }
  }))

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setIsLightTheme(false)
    } else if (localStorage.theme === 'light') {
      setIsLightTheme(true)
    }
  }, [])

  useEffect(() => {
    setIsDashboardUrl(history.location.pathname.includes('dashboard'))
  }, [history.location.pathname])

  function onThemeToggleClick() {
    setIsLightTheme(!isLightTheme)

    localStorage.theme === 'dark'
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark')
  }

  return (
    <MuiThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <Grid container className={classes.control}>
        <Toolbar onThemeToggleClick={onThemeToggleClick} isLightTheme={isLightTheme} />
        <div className={classes.toolbar} />
        {children}
        {isDashboardUrl ? null : <Footer />}
      </Grid>
      <Alert />
    </MuiThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(Layout)
