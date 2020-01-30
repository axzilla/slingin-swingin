import axios from 'axios'

const rootUrl = `${process.env.BOUNCE_API_URL}/auth`

export function userRegister(userData) {
  return axios.post(`${rootUrl}/register`, userData)
}

export function userLogin(userData) {
  return axios.post(`${rootUrl}/login`, userData)
}

export function avatarUpload(formData, config) {
  return axios.post(`${rootUrl}/avatar-upload`, formData, config)
}

export function avatarDelete() {
  return axios.post(`${rootUrl}/avatar-delete`)
}

export function passwordForgot(emailData) {
  return axios.post(`${rootUrl}/password-forgot`, emailData)
}

export function passwordReset(passwordData) {
  return axios.post(`${rootUrl}/password-reset`, passwordData)
}

export function usernameChange(usernameData) {
  return axios.post(`${rootUrl}/username-change`, usernameData)
}

export function passwordChange(passwordData) {
  return axios.post(`${rootUrl}/password-change`, passwordData)
}

export function emailChange(emailData) {
  return axios.post(`${rootUrl}/email-change`, emailData)
}

export function settingsUpdate(settingData) {
  return axios.post(`${rootUrl}/settings-change`, settingData)
}
