import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'

import Router from 'next/router'
import { withRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

import setAuthToken from '../utils/setAuthToken'
import AuthContext from '../contexts/AuthContext'
import { AlertContextProvider } from '../contexts/AlertContext'

import Layout from '../components/layout/Layout'

class MyApp extends App {
  state = {
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
      console.log(decodedUser)
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
    const cookies = new Cookies()
    await cookies.set('jwtToken', jwtToken, { path: '/' })
    await setAuthToken(jwtToken)
    const decodedUser = jwtDecode(jwtToken)

    this.setState({
      isAuthenticated: true,
      user: decodedUser
    })

    if (decodedUser.role === 'company') {
      Router.push('/profiles')
    } else if (decodedUser.role === 'student') {
      Router.push('/s/dashboard')
    } else if (decodedUser.role === 'admin') {
      Router.push('/a/dashboard')
    }
  }

  logout = async () => {
    const cookies = new Cookies()
    cookies.remove('jwtToken', { path: '/' })

    await Router.push('/login')

    this.setState({
      isAuthenticated: false,
      user: {}
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>hustler.dev</title>
        </Head>
        <CssBaseline />
        <AuthContext.Provider
          value={{
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            login: this.login,
            logout: this.logout
          }}
        >
          <AlertContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AlertContextProvider>
        </AuthContext.Provider>
      </>
    )
  }
}

export default withRouter(MyApp)