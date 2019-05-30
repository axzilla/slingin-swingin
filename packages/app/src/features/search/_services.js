import axios from 'axios'

export const searchFuncService = searchString => {
  return axios.get(`/search/${searchString}`)
}
