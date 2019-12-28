import axios from 'axios'

const rootUrl = `${process.env.ROOT_URL}/profile`

export function getCurrentProfile() {
  return axios.get(`${rootUrl}/get-profile-by-current-user`)
}

export function getAllProfiles() {
  return axios.get(`${rootUrl}/get-all-profiles`)
}

export function getProfileByHandle(handle) {
  return axios.get(`${rootUrl}/get-profile-by-handle/${handle}`)
}

export function createProfile(profileData) {
  return axios.post(`${rootUrl}/create-profile`, profileData)
}
