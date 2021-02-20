import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/mediafile`

export function getMediaFilesByPostId(postId) {
  return axios.get(`${serverUrl}/get-mediafiles-by-post-id/${postId}`)
}

export function createMediaFiles(data) {
  return axios.post(`${serverUrl}/create-mediafiles`, data)
}

export function deleteMediaFiles(data) {
  return axios.post(`${serverUrl}/delete-mediafiles`, data)
}
