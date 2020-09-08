// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import withGA from 'next-ga'
import Router from 'next/router'
import { withRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import io from 'socket.io-client'
import { Provider } from 'react-redux'

// MUI
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import LinearProgress from '@material-ui/core/LinearProgress'

// Theme
import { theme } from '../theme'

// Components
import Alert from '@components/Alert'
import AuthModal from '@components/AuthModal'

// Utils
import setAuthToken from '@utils/setAuthToken'

// Contexts
import AuthContext from '@contexts/AuthContext'
import { AlertContextProvider } from '@contexts/AlertContext'

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

function MyApp(props) {
  const [socket, setSocket] = useState({})

  const [state, setState] = useState({
    isAuthModal: false,
    isAuthenticated: false,
    user: {}
  })

  useEffect(() => {
    setSocket(io(process.env.NOIZE_APP_SERVER_URL))
    const cookies = new Cookies()
    const jwtToken = cookies.get('jwtToken')
    setAuthToken(jwtToken)

    if (jwtToken) {
      const decodedUser = jwtDecode(jwtToken)

      setState({
        state,
        isAuthenticated: true,
        user: decodedUser
      })
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    return () => {
      setSocket({})
    }
  }, [])

  const setIsAuthModal = async value => {
    try {
      setState({
        ...state,
        isAuthModal: value
      })
    } catch (error) {
      if (error) throw error
    }
  }

  const login = async jwtToken => {
    try {
      const cookies = new Cookies()
      await cookies.set('jwtToken', jwtToken, { path: '/' })
      await setAuthToken(jwtToken)
      const decodedUser = jwtDecode(jwtToken)

      socket.emit('client-sign-in', { decodedUser, socketId: socket.id })

      setState({
        ...state,
        isAuthenticated: true,
        user: decodedUser
      })
    } catch (error) {
      if (error) throw error
    }
  }

  const logout = async () => {
    try {
      const cookies = new Cookies()
      const decodedUser = jwtDecode(await cookies.get('jwtToken', { path: '/' }))
      await cookies.remove('jwtToken', { path: '/' })

      socket.emit('client-sign-out', { decodedUser, socketId: socket.id })

      await Router.push('/login')

      setState({
        state,
        isAuthenticated: false,
        user: {}
      })
    } catch (error) {
      if (error) throw error
    }
  }

  const { Component, pageProps } = props

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>The #1 Music Production Community</title>
      </Head>
      <AuthContext.Provider
        value={{
          isAuthModal: state.isAuthModal,
          setIsAuthModal: setIsAuthModal,
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          login: login,
          logout: logout
        }}
      >
        <AlertContextProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <RouterLoading />
            <Component {...pageProps} />
            <Alert />
            <AuthModal />
          </MuiThemeProvider>
        </AlertContextProvider>
      </AuthContext.Provider>
    </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default withRouter(withGA(process.env.NOIZE_APP_GOOGLE_ANALYTICS, Router)(MyApp))
