import axios from 'axios'

export const registerUser = userData => {
  return axios.post(`/users/register`, userData)
}

export const loginUser = loginData => {
  return axios.post(`/users/login`, loginData)
}

export const uploadAvatar = (formData, config) => {
  return axios.post(`/users/avatarUpload`, formData, config)
}

export const deleteAvatar = () => {
  return axios.post(`/users/avatarDelete`)
}

export const verifyUser = decoded => {
  return axios.post(`/users/verify`, decoded)
}

export const sendVerificationEmail = user => {
  return axios.post(`/users/verify/send-email`, user)
}

export const forgotPassword = emailData => {
  return axios.post(`/users/forgot-password`, emailData)
}

export const setNewPassword = passwordData => {
  return axios.post(`/users/reset-password`, passwordData)
}

export const changeUsername = usernameData => {
  return axios.post(`/users/change-username`, usernameData)
}

export const changePassword = passwordData => {
  return axios.post(`/users/change-password`, passwordData)
}

export const changeEmail = emailData => {
  return axios.post(`/users/change-email`, emailData)
}

export const updateSettings = settingData => {
  return axios.post(`/users/change-settings`, settingData)
}

export default {
  registerUser,
  loginUser,
  uploadAvatar,
  deleteAvatar,
  verifyUser,
  sendVerificationEmail,
  forgotPassword,
  setNewPassword,
  changeUsername,
  changePassword,
  changeEmail,
  updateSettings
}
