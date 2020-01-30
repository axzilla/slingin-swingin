import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Topbar, Footer } from './components'
import { Alert } from '../../components'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Grid } from '@material-ui/core'

function Layout({ children }) {
  const [isDashboardUrl, setIsDashboardUrl] = useState(false)

  const useStyles = makeStyles(theme => ({
    topbar: theme.mixins.toolbar,
    control: {
      padding: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        padding: !isDashboardUrl ? `${theme.spacing(2)}px ${theme.spacing(18)}px` : null
      }
    }
  }))

  const classes = useStyles()

  useEffect(() => {
    setIsDashboardUrl(Router.pathname.includes('dashboard'))
  }, [])

  useEffect(() => {
    setIsDashboardUrl(Router.pathname.includes('dashboard'))
  }, [Router])

  return (
    <>
      <CssBaseline />
      <Grid container className={classes.control}>
        <Topbar />
        <div className={classes.topbar} />
        {children}
        <Footer />
      </Grid>
      <Alert />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
