import axios from 'axios'

export function registerUser(userData) {
  return axios.post(`/users/register`, userData)
}

export function loginUser(loginData) {
  return axios.post(`/users/login`, loginData)
}

export function uploadAvatar(formData, config) {
  return axios.post(`/users/avatarUpload`, formData, config)
}

export function deleteAvatar() {
  return axios.post(`/users/avatarDelete`)
}

export function verifyUser(decoded) {
  return axios.post(`/users/verify`, decoded)
}

export function sendVerificationEmail(user) {
  return axios.post(`/users/verify/send-email`, user)
}

export function forgotPassword(emailData) {
  return axios.post(`/users/forgot-password`, emailData)
}

export function setNewPassword(passwordData) {
  return axios.post(`/users/reset-password`, passwordData)
}

export function changeUsername(usernameData) {
  return axios.post(`/users/change-username`, usernameData)
}

export function changePassword(passwordData) {
  return axios.post(`/users/change-password`, passwordData)
}

export function changeEmail(emailData) {
  return axios.post(`/users/change-email`, emailData)
}

export function updateSettings(settingData) {
  return axios.post(`/users/change-settings`, settingData)
}
