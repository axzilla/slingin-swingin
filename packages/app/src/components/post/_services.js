import axios from 'axios'

export function addPost(postData) {
  return axios.post(`/posts/create`, postData)
}

export function editPost(postData) {
  return axios.post(`/posts/edit`, postData)
}

export function getPost(postId) {
  return axios.get(`/posts/get-post/${postId}`)
}

export function getPosts() {
  return axios.get(`/posts`)
}

export function getPostByShortId(postId) {
  return axios.get(`/posts/short/${postId}`)
}

export function getPostsByUserId(id) {
  return axios.get(`/posts/getPosts/published/userId/${id}`)
}

export function getPostsByUserBookmark(userId) {
  return axios.get(`/posts/getposts/bookmark/${userId}`)
}

export function getPostsByTag(tag) {
  return axios.get(`/posts/getposts/tag/${tag}`)
}

export function deletePost(id) {
  return axios.delete(`/posts/${id}`)
}

export function handlePostLikes(postId) {
  return axios.post(`/posts/like/${postId}`)
}

export function handlePostBookmarks(postId) {
  return axios.post(`/posts/bookmark/${postId}`)
}

export function getPostsTags() {
  return axios.get(`/posts/getAllTags/`)
}
