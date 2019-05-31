import React, { createContext, useState, useContext } from 'react'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const getInitialState = () => {
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

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialState())

  const defaultContext = {
    auth,
    setAuth
  }

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  )
}
