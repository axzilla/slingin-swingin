import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

export const registerUser = userData => {
  return axios.post(`${apiURL}/users/register`, userData)
}

export const loginUser = loginData => {
  return axios.post(`${apiURL}/users/login`, loginData)
}

export const uploadAvatar = (formData, config) => {
  return axios.post(`${apiURL}/users/avatarUpload`, formData, config)
}

export const deleteAvatar = () => {
  return axios.post(`${apiURL}/users/avatarDelete`)
}

export const verifyUser = decoded => {
  return axios.post(`${apiURL}/users/verify`, decoded)
}

export const sendVerificationEmail = user => {
  return axios.post(`${apiURL}/users/verify/send-email`, user)
}

export const forgotPassword = emailData => {
  return axios.post(`${apiURL}/users/forgot-password`, emailData)
}

export const setNewPassword = passwordData => {
  return axios.post(`${apiURL}/users/reset-password`, passwordData)
}

export const changeUsername = usernameData => {
  return axios.post(`${apiURL}/users/change-username`, usernameData)
}

export const changePassword = passwordData => {
  return axios.post(`${apiURL}/users/change-password`, passwordData)
}

export const changeEmail = emailData => {
  return axios.post(`${apiURL}/users/change-email`, emailData)
}

export const updateSettings = settingData => {
  return axios.post(`${apiURL}/users/change-settings`, settingData)
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
