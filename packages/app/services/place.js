import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/place`

export function getAllPlaces(query) {
  return axios.get(`${serverUrl}/get-all-places${query ? '?' + query : ''}`)
}

export function getPlaceByShortId(data) {
  return axios.get(`${serverUrl}/get-place-by-short-id/${data}`)
}

export function getPlacePhotos(data) {
  return axios.get(`${serverUrl}/get-place-photos/${data}`)
}

export function getPlacesBySearchTerm(data) {
  return axios.post(`${serverUrl}/get-places-by-search-term`, data)
}

export function placeCreate(data) {
  return axios.post(`${serverUrl}/place-create`, data)
}
