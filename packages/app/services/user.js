import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/user`

export function getCurrentUser() {
  return axios.get(`${serverUrl}/get-current-user`)
}

export function getAllUsers(query) {
  return axios.get(`${serverUrl}/get-all-users${query ? '?' + query : ''}`)
}

export function getUserByUsername(username) {
  return axios.get(`${serverUrl}/get-user-by-username/${username}`)
}

export function updateUser(userData) {
  return axios.post(`${serverUrl}/update-user`, userData)
}

export function getPlaceCurrentUsersByPlaceId(placeId) {
  return axios.get(`${serverUrl}/get-place-current-users-by-place-id/${placeId}`)
}

export function getPlaceBeenUsersByPlaceId(placeId) {
  return axios.get(`${serverUrl}/get-place-been-users-by-place-id/${placeId}`)
}

export function getPlaceWantUsersByPlaceId(placeId) {
  return axios.get(`${serverUrl}/get-place-want-users-by-place-id/${placeId}`)
}
