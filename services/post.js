import axios from 'axios'

const rootUrl = `${process.env.NOIZE_APP_API_URL}/posts`

export function postCreate(postData) {
  return axios.post(`${rootUrl}/post-create`, postData)
}

export function postUpdate(postData) {
  return axios.patch(`${rootUrl}/post-update`, postData)
}

export function postDelete(postId) {
  return axios.delete(`${rootUrl}/post-delete`, { data: { postId } })
}

export function postToggleLikes(postId) {
  return axios.post(`${rootUrl}/post-toggle-likes`, { postId })
}

export function postToggleBookmarks(postId) {
  return axios.post(`${rootUrl}/post-toggle-bookmarks`, { postId })
}

export function getPostById(postId) {
  return axios.get(`${rootUrl}/get-post-by-id/${postId}`)
}

export function getPosts() {
  return axios.get(`${rootUrl}/get-all-posts`)
}

export function getPostByShortId(shortId) {
  return axios.get(`${rootUrl}/get-post-by-short-id/${shortId}`)
}

export function getPostsByUserId(id) {
  return axios.get(`${rootUrl}/get-posts-by-user-id/${id}`)
}

export function getPostsByUserBookmark(userId) {
  return axios.get(`${rootUrl}/get-posts-by-bookmarked-user/${userId}`)
}

export function getPostsByTag(tag) {
  return axios.get(`${rootUrl}/get-posts-by-tag/${tag}`)
}

export function getPostsTags() {
  return axios.get(`${rootUrl}/get-all-posts-tags/`)
}
