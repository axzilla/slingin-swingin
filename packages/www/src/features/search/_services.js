import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

export const searchFuncService = searchString => {
  return axios.get(`${apiURL}/search/${searchString}`)
}
