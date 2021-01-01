import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/search`

export function searchFunc(searchString) {
  return axios.get(`${serverUrl}/${searchString}`)
}
