import axios from 'axios'

export const addPost = postData => {
  return axios.post(`/posts/create`, postData)
}

export const editPost = postData => {
  return axios.post(`/posts/edit`, postData)
}

export const getPost = postId => {
  return axios.get(`/posts/${postId}`)
}

export const getPosts = () => {
  return axios.get(`/posts`)
}

export const getPostByShortId = postId => {
  return axios.get(`/posts/short/${postId}`)
}

export const getPostsByUserId = id => {
  return axios.get(`/posts/getPosts/published/userId/${id}`)
}

export const getDraftPostsByUserId = id => {
  return axios.get(`/posts/getPosts/draft/userId/${id}`)
}

export const getPostsByUserBookmark = userId => {
  return axios.get(`/posts/getposts/bookmark/${userId}`)
}

export const getPostsByTag = tag => {
  return axios.get(`/posts/getposts/tag/${tag}`)
}

export const deletePost = (id, history) => {
  return axios.delete(`/posts/${id}`)
}

export const handlePostLikes = postId => {
  return axios.post(`/posts/like/${postId}`)
}

export const handlePostBookmarks = postId => {
  return axios.post(`/posts/bookmark/${postId}`)
}

export const getPostsTags = () => {
  return axios.get(`/posts/getAllTags/`)
}
