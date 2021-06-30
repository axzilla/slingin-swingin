// Packages
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
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
import Sockets from '@components/Sockets'

// Contexts
import { AlertContextProvider } from '@contexts/AlertContext'
import { SocketContextProvider } from '@contexts/SocketContext'
import ScrollContext from '@contexts/ScrollContext'

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
    isLoading && (
      <>
        <LinearProgress
          color="secondary"
          style={{ position: 'fixed', width: '100%', bottom: '0', zIndex: 9999999 }}
        />
        <LinearProgress
          color="secondary"
          style={{ position: 'fixed', width: '100%', top: '0', zIndex: 9999999 }}
        />
      </>
    )
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
  }, [])

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

  const scrollRef = useRef({
    scrollPos: 0
  })

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>The #1 Treasure Hunting Community</title>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" rel="stylesheet" />
      </Head>

      <InitialAuthSetup />

      <SocketContextProvider>
        <AlertContextProvider>
          <CustomThemeProvider>
            <RouterLoading />
            <CssBaseline />
            <ScrollContext.Provider value={{ scrollRef: scrollRef }}>
              <Component {...pageProps} />
            </ScrollContext.Provider>
            <Sockets />
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

export default MyApp
