import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`

export function getCurrentProfile() {
  return axios.get(`${serverUrl}/get-profile-by-current-user`)
}

export function getAllProfiles() {
  return axios.get(`${serverUrl}/get-all-profiles`)
}

export function getProfileByHandle(handle) {
  return axios.get(`${serverUrl}/get-profile-by-handle/${handle}`)
}

export function profileUpdate(profileData) {
  return axios.post(`${serverUrl}/profile-update`, profileData)
}
