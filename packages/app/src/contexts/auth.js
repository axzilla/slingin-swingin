import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

function getInitialState() {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwtDecode(localStorage.jwtToken)
    const currentTime = Date.now() / 1000

    if (decoded.exp >= currentTime) {
      return { isAuthenticated: true, user: decoded, error: {} }
    }

    localStorage.removeItem('jwtToken')
    window.location.href = '/login'
  }
  return { isAuthenticated: false, user: {}, error: {} }
}

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(getInitialState())

  const defaultContext = {
    auth,
    setAuth
  }

  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
