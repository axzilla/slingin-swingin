import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/place`

export function getAllPlaces() {
  return axios.get(`${serverUrl}/get-all-places`)
}
