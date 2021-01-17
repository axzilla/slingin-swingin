// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import withGA from 'next-ga'
import Router from 'next/router'
import { withRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { Provider, useDispatch, useSelector } from 'react-redux'
import 'draft-js/dist/Draft.css'

// Redux
import { signInReducer } from '@slices/authSlice'

// MUI
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import LinearProgress from '@material-ui/core/LinearProgress'

// Theme
import { theme } from '../theme'

// Components
import Alert from '@components/Alert'
import AuthModal from '@components/AuthModal'

// Contexts
import { AlertContextProvider } from '@contexts/AlertContext'
import { SocketContextProvider } from '@contexts/SocketContext'

// Redux Store
import store from '../store'

function RouterLoading() {
  const [isLoading, setIsLoading] = useState(false)

  Router.events.on('routeChangeStart', () => {
    setIsLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false)
  })

  Router.events.on('routeChangeError', () => {
    setIsLoading(false)
  })

  return (
    <>
      {isLoading && (
        <LinearProgress color="secondary" style={{ position: 'sticky', top: '0', zIndex: 9999 }} />
      )}
    </>
  )
}

function InitialAuthSetup() {
  const dispatch = useDispatch()

  useEffect(() => {
    const cookies = new Cookies()
    const jwtToken = cookies.get('jwtToken')

    if (jwtToken) {
      dispatch(signInReducer(jwtToken))
    }
  })

  return null
}

function CustomThemeProvider(props) {
  const { isDarkTheme } = useSelector(state => state.theme)
  return <MuiThemeProvider theme={theme(isDarkTheme ? 'dark' : 'light').theme} {...props} />
}

function MyApp(props) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  const { Component, pageProps } = props

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>The #1 Music Production Community</title>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" rel="stylesheet" />
      </Head>

      <InitialAuthSetup />

      <SocketContextProvider>
        <AlertContextProvider>
          <CustomThemeProvider>
            <CssBaseline />
            <RouterLoading />
            <Component {...pageProps} />
            <Alert />
            <AuthModal />
          </CustomThemeProvider>
        </AlertContextProvider>
      </SocketContextProvider>
    </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default withRouter(withGA(process.env.NOIZE_APP_GOOGLE_ANALYTICS, Router)(MyApp))
