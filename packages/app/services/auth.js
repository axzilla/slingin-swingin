import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth`

export function userRegister(userData) {
  return axios.post(`${serverUrl}/register`, userData)
}

export function userLogin(userData) {
  return axios.post(`${serverUrl}/login`, userData)
}

export function avatarUpload(formData, config) {
  return axios.post(`${serverUrl}/avatar-upload`, formData, config)
}

export function avatarDelete() {
  return axios.post(`${serverUrl}/avatar-delete`)
}

export function passwordForgot(emailData) {
  return axios.post(`${serverUrl}/password-forgot`, emailData)
}

export function passwordReset(passwordData) {
  return axios.post(`${serverUrl}/password-reset`, passwordData)
}

export function usernameChange(usernameData) {
  return axios.post(`${serverUrl}/username-change`, usernameData)
}

export function passwordChange(passwordData) {
  return axios.post(`${serverUrl}/password-change`, passwordData)
}

export function emailChange(emailData) {
  return axios.post(`${serverUrl}/email-change`, emailData)
}

export function settingsUpdate(settingData) {
  return axios.post(`${serverUrl}/settings-change`, settingData)
}

export function sendActivationEmail(data) {
  return axios.post(`${serverUrl}/send-activation-email`, data)
}

export function activateAccount(data) {
  return axios.post(`${serverUrl}/activate-account`, data)
}
