import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/users`

export function getOnlineUsers() {
  return axios.get(`${serverUrl}/get-online-users`)
}
