import axios from 'axios'

const serverUrl = `${process.env.NOIZE_APP_SERVER_URL}/search`

export function searchFunc(searchString) {
  return axios.get(`${serverUrl}/${searchString}`)
}
