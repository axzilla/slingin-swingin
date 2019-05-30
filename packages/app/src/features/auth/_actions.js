import { createAction } from 'redux-starter-kit'

import setAuthToken from '../../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

import api from './_services'

import { setAlert } from '../common/_actions'

export const setCurrentUser = createAction('setCurrentUser')
export const setAuthErrors = createAction('setAuthErrors')
export const clearAuthErrors = createAction('clearAuthErrors')
export const setAuthLoading = createAction('setAuthLoading')

export const uploadAvatar = (formData, config) => dispatch => {
  dispatch(setAuthLoading(true))

  api
    .uploadAvatar(formData, config)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(setAuthLoading(false))
      dispatch(
        setAlert({ message: 'Profilbild gespeichert', variant: 'success' })
      )
    })
    .catch(error => {
      console.log(error)
    })
}

export const deleteAvatar = () => dispatch => {
  api
    .deleteAvatar()
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(setAlert({ message: 'Profilbild gelöscht', variant: 'success' }))
    })
    .catch(error => {
      console.log(error)
    })
}

export const registerUser = (userData, history) => dispatch => {
  api
    .registerUser(userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      history.push('/dashboard')
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const verifyUser = decoded => dispatch => {
  api
    .verifyUser(decoded)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const sendVerificationEmail = user => dispatch => {
  api
    .sendVerificationEmail(user)
    .then(res => {
      dispatch(clearAuthErrors)
      dispatch(setAlert({ message: 'E-Mail gesendet', variant: 'success' }))
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const loginUser = (loginData, history) => dispatch => {
  api
    .loginUser(loginData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      history.push('/dashboard')
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const forgotPassword = emailData => dispatch => {
  api
    .forgotPassword(emailData)
    .then(res => {})
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const setNewPassword = (passwordData, history) => dispatch => {
  api
    .setNewPassword(passwordData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      history.push('/dashboard')
    })
    .then(res => dispatch(clearAuthErrors))
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const changeUsername = usernameData => dispatch => {
  api
    .changeUsername(usernameData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(clearAuthErrors)
      dispatch(
        setAlert({
          message: 'Benutzername erfolgreich geändert',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const changePassword = passwordData => dispatch => {
  api
    .changePassword(passwordData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(clearAuthErrors)
      dispatch(
        setAlert({
          message: 'Passwort erfolgreich geändert',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const changeEmail = emailData => dispatch => {
  api
    .changeEmail(emailData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(clearAuthErrors)
      dispatch(
        setAlert({
          message: 'E-Mail Adresse erfolgreich geändert',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const updateSettings = settingData => dispatch => {
  api
    .updateSettings(settingData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(setCurrentUser(decoded))
      dispatch(
        setAlert({
          message: 'E-Mail Einstellungen gespeichert',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setAuthErrors(err.response.data)))
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
