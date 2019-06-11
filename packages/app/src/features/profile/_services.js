import axios from 'axios'

export function getCurrentProfile() {
  return axios.get(`/profile`)
}

export function getProfiles() {
  return axios.get(`/profile/all`)
}

export function getProfileByHandle(handle) {
  return axios.get(`/profile/handle/${handle}`)
}

export function createProfile(profileData) {
  return axios.post(`/profile`, profileData)
}
