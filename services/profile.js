import axios from 'axios'

const rootUrl = `${process.env.NOIZE_APP_API_URL}/profile`

export function getCurrentProfile() {
  return axios.get(`${rootUrl}/get-profile-by-current-user`)
}

export function getAllProfiles() {
  return axios.get(`${rootUrl}/get-all-profiles`)
}

export function getProfileByHandle(handle) {
  return axios.get(`${rootUrl}/get-profile-by-handle/${handle}`)
}

export function profileUpdate(profileData) {
  return axios.post(`${rootUrl}/profile-update`, profileData)
}
