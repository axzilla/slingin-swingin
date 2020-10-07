// Packages
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

// Utils
import setAuthToken from '@utils/setAuthToken'

const cookies = new Cookies()

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: cookies.get('jwtToken') || null,
    isAuthenticated: false,
    isAuthModal: false,
    user: {}
  },
  reducers: {
    signInReducer: (state, action) => {
      const jwtToken = action.payload
      setAuthToken(jwtToken)
      const decodedUser = jwtDecode(jwtToken)
      cookies.set('jwtToken', jwtToken, { path: '/', domain: process.env.COOKIES_DOMAIN })

      state.token = jwtToken
      state.isAuthenticated = true
      state.user = decodedUser
    },
    signOutReducer: state => {
      cookies.remove('jwtToken', { path: '/', domain: process.env.COOKIES_DOMAIN })

      state.token = null
      state.isAuthenticated = false
      state.user = {}
    },
    setIsAuthModalReducer: (state, action) => {
      state.isAuthModal = action.payload
    }
  }
})

export const { signInReducer, signOutReducer, setIsAuthModalReducer } = authSlice.actions

export const auth = state => state.auth

export default authSlice.reducer
