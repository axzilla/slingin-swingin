import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/placeReview`

export function createPlaceReview(data) {
  return axios.post(`${serverUrl}/create-placereview`, data)
}

export function updatePlaceReview(data) {
  return axios.post(`${serverUrl}/update-placereview`, data)
}

export function getPlaceReviewsByPlaceId(placeId) {
  return axios.get(`${serverUrl}/get-place-reviews-by-place-id/${placeId}`)
}
