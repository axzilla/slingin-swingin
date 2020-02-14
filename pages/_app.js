import React, { useState } from 'react'
import App from 'next/app'
import Head from 'next/head'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import LinearProgress from '@material-ui/core/LinearProgress'

import { theme } from '../theme'

import Router from 'next/router'
import { withRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

import Alert from '@components/Alert'
import AuthModal from '@components/AuthModal'
import setAuthToken from '@utils/setAuthToken'
import AuthContext from '@contexts/AuthContext'
import { AlertContextProvider } from '@contexts/AlertContext'

function RouterLoading() {
  const [isLoading, setIsLoading] = useState(false)

  Router.events.on('routeChangeStart', url => {
    setIsLoading(true)
    console.log(`Loading: ${url}`)
  })

  Router.events.on('routeChangeComplete', url => {
    setIsLoading(false)
    console.log(`Done: ${url}`)
  })

  Router.events.on('routeChangeError', url => {
    setIsLoading(false)
    console.log(`Error: ${url}`)
  })

  return (
    <>
      {isLoading && (
        <LinearProgress color="secondary" style={{ position: 'sticky', top: '0', zIndex: 9999 }} />
      )}
    </>
  )
}

class MyApp extends App {
  state = {
    isAuthModal: false,
    isAuthenticated: false,
    user: {}
  }

  componentDidMount() {
    const cookies = new Cookies()
    const jwtToken = cookies.get('jwtToken')
    setAuthToken(jwtToken)

    if (jwtToken) {
      const decodedUser = jwtDecode(jwtToken)
      const currentTime = Date.now() / 1000

      if (decodedUser.exp > currentTime) {
        this.setState({
          ...this.state,
          isAuthenticated: true,
          user: decodedUser
        })
      }
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  setIsAuthModal = async value => {
    try {
      this.setState({
        ...this.state,
        isAuthModal: value
      })
    } catch (error) {
      if (error) throw error
    }
  }

  login = async jwtToken => {
    try {
      const cookies = new Cookies()
      await cookies.set('jwtToken', jwtToken, { path: '/' })
      await setAuthToken(jwtToken)
      const decodedUser = jwtDecode(jwtToken)

      this.setState({
        ...this.state,
        isAuthenticated: true,
        user: decodedUser
      })
    } catch (error) {
      if (error) throw error
    }
  }

  logout = async () => {
    try {
      const cookies = new Cookies()
      cookies.remove('jwtToken', { path: '/' })

      await Router.push('/login')

      this.setState({
        ...this.state,
        isAuthenticated: false,
        user: {}
      })
    } catch (error) {
      if (error) throw error
    }
  }

  getTheme = () => {
    const cookies = new Cookies()
    const theme = cookies.get('theme')
    return theme
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <AuthContext.Provider
          value={{
            isAuthModal: this.state.isAuthModal,
            setIsAuthModal: this.setIsAuthModal,
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            login: this.login,
            logout: this.logout
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
      </>
    )
  }
}

export default withRouter(MyApp)
