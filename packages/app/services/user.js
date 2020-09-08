import axios from 'axios'

const serverUrl = `${process.env.NOIZE_APP_SERVER_URL}/users`

export function getOnlineUsers() {
  return axios.get(`${serverUrl}/get-online-users`)
}
