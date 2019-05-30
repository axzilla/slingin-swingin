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

export const getProfilesByFollowingId = id => {
  return axios.get(`/profile/following/${id}`)
}

export const getProfilesByFollowerId = id => {
  return axios.get(`/profile/follower/${id}`)
}

export const createProfile = profileData => {
  return axios.post(`/profile`, profileData)
}

export const handleUserFollower = followedUserId => {
  return axios.post(`/users/follower/${followedUserId}`)
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
