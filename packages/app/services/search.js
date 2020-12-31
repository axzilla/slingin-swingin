import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_NOIZE_APP_SERVER_URL}/search`

export function searchFunc(searchString) {
  return axios.get(`${serverUrl}/${searchString}`)
}
