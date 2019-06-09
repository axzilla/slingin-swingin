import axios from 'axios'

export const getCurrentProfile = () => {
  return axios.get(`/profile`)
}

export const getProfiles = () => {
  return axios.get(`/profile/all`)
}

export const getProfileByHandle = async handle => {
  return await axios.get(`/profile/handle/${handle}`)
}

export const createProfile = profileData => {
  return axios.post(`/profile`, profileData)
}

export default {
  getCurrentProfile,
  getProfiles,
  getProfileByHandle,
  createProfile
}
