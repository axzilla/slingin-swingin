import axios from 'axios'

export function searchFunc(searchString) {
  return axios.get(`/search/${searchString}`)
}
