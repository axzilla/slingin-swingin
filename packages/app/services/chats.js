import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_NOIZE_APP_SERVER_URL}/chats`

export function messageCreate(data) {
  return axios.post(`${serverUrl}/message-create`, data)
}

export function messageDelete(messageId) {
  return axios.post(`${serverUrl}/message-delete`, messageId)
}

export function messageUpdate(messageId) {
  return axios.post(`${serverUrl}/message-update`, messageId)
}

export function conversationsGetByUserId(data) {
  return axios.post(`${serverUrl}/conversations-get-by-user-id`, data)
}
