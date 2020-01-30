import axios from 'axios'

const rootUrl = `${process.env.BOUNCE_API_URL}/search`

export function searchFunc(searchString) {
  return axios.get(`${rootUrl}/${searchString}`)
}
