import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap`

export function getAllPlaces() {
  return axios.get(`${serverUrl}/get-all-places`)
}

export function getAllPosts() {
  return axios.get(`${serverUrl}/get-all-posts`)
}
export function getAllUsers() {
  return axios.get(`${serverUrl}/get-all-users`)
}
