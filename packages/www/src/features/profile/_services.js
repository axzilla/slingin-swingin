import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

export const getCurrentProfile = () => {
  return axios.get(`${apiURL}/profile`)
}

export const getProfiles = () => {
  return axios.get(`${apiURL}/profile/all`)
}

export const getProfileByHandle = async handle => {
  return await axios.get(`${apiURL}/profile/handle/${handle}`)
}

export const getProfilesByFollowingId = id => {
  return axios.get(`${apiURL}/profile/following/${id}`)
}

export const getProfilesByFollowerId = id => {
  return axios.get(`${apiURL}/profile/follower/${id}`)
}

export const createProfile = profileData => {
  return axios.post(`${apiURL}/profile`, profileData)
}

export const handleUserFollower = followedUserId => {
  return axios.post(`${apiURL}/users/follower/${followedUserId}`)
}

export default {
  getCurrentProfile,
  getProfiles,
  getProfileByHandle,
  getProfilesByFollowingId,
  getProfilesByFollowerId,
  createProfile,
  handleUserFollower
}
