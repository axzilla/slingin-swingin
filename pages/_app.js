import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Router from 'next/router'
import { withRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

import setAuthToken from '../utils/setAuthToken'
import AuthContext from '../contexts/AuthContext'
import { AlertContextProvider } from '../contexts/AlertContext'

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#212121'
    },
    secondary: {
      main: '#90caf9'
    }
  },
  typography: {
    useNextVariants: true
  }
})

class MyApp extends App {
  state = {
    isLightTheme: true,
    isAuthenticated: false,
    user: {}
  }

  componentDidMount() {
    const cookies = new Cookies()
    const jwtToken = cookies.get('jwtToken')
    setAuthToken(jwtToken)

    if (localStorage.theme === 'dark') {
      this.setState({ ...this.state, isLightTheme: false })
    } else if (localStorage.theme === 'light') {
      this.setState({ ...this.state, isLightTheme: true })
    }

    if (jwtToken) {
      const decodedUser = jwtDecode(jwtToken)
      const currentTime = Date.now() / 1000

      if (decodedUser.exp > currentTime) {
        this.setState({
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

  login = async jwtToken => {
    try {
      const cookies = new Cookies()
      await cookies.set('jwtToken', jwtToken, { path: '/' })
      await setAuthToken(jwtToken)
      const decodedUser = jwtDecode(jwtToken)

      this.setState({
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
        isAuthenticated: false,
        user: {}
      })
    } catch (error) {
      if (error) throw error
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AuthContext.Provider
          value={{
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            login: this.login,
            logout: this.logout
          }}
        >
          <AlertContextProvider>
            <MuiThemeProvider theme={lightTheme}>
              <Component {...pageProps} />
            </MuiThemeProvider>
          </AlertContextProvider>
        </AuthContext.Provider>
      </>
    )
  }
}

export default withRouter(MyApp)