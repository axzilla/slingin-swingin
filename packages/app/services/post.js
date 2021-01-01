import axios from 'axios'

const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`

export function postCreate(postData) {
  return axios.post(`${serverUrl}/post-create`, postData)
}

export function postUpdate(postData) {
  return axios.patch(`${serverUrl}/post-update`, postData)
}

export function postDelete(postId) {
  return axios.delete(`${serverUrl}/post-delete`, { data: { postId } })
}

export function postToggleLikes(postId) {
  return axios.post(`${serverUrl}/post-toggle-likes`, { postId })
}

export function postToggleBookmarks(postId) {
  return axios.post(`${serverUrl}/post-toggle-bookmarks`, { postId })
}

export function getPostById(postId) {
  return axios.get(`${serverUrl}/get-post-by-id/${postId}`)
}

export function getPosts() {
  return axios.get(`${serverUrl}/get-all-posts`)
}

export function getPostByShortId(shortId) {
  return axios.get(`${serverUrl}/get-post-by-short-id/${shortId}`)
}

export function getPostsByUserId(id) {
  return axios.get(`${serverUrl}/get-posts-by-user-id/${id}`)
}

export function getPostsByUserBookmark(userId) {
  return axios.get(`${serverUrl}/get-posts-by-bookmarked-user/${userId}`)
}

export function getPostsByTag(tag) {
  return axios.get(`${serverUrl}/get-posts-by-tag/${tag}`)
}

export function getPostsTags() {
  return axios.get(`${serverUrl}/get-all-posts-tags/`)
}
