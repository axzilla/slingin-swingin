import axios from 'axios'

const addPost = postData => {
  return axios.post(`/posts/create`, postData)
}

const editPost = postData => {
  return axios.post(`/posts/edit`, postData)
}

const getPost = postId => {
  return axios.get(`/posts/${postId}`)
}

const getPosts = () => {
  return axios.get(`/posts`)
}

const getPostByShortId = postId => {
  return axios.get(`/posts/short/${postId}`)
}

const getPostsByUserId = id => {
  return axios.get(`/posts/getPosts/published/userId/${id}`)
}

const getDraftPostsByUserId = id => {
  return axios.get(`/posts/getPosts/draft/userId/${id}`)
}

const getPostsByUserBookmark = userId => {
  return axios.get(`/posts/getposts/bookmark/${userId}`)
}

const getPostsByTag = tag => {
  return axios.get(`/posts/getposts/tag/${tag}`)
}

const deletePost = (id, history) => {
  return axios.delete(`/posts/${id}`)
}

const handlePostLikes = postId => {
  return axios.post(`/posts/like/${postId}`)
}

const handlePostBookmarks = postId => {
  return axios.post(`/posts/bookmark/${postId}`)
}

const getPostsTags = () => {
  return axios.get(`/posts/getAllTags/`)
}

export default {
  addPost,
  editPost,
  getPosts,
  getPost,
  getPostByShortId,
  getPostsByUserId,
  getDraftPostsByUserId,
  getPostsByUserBookmark,
  deletePost,
  handlePostLikes,
  handlePostBookmarks,
  getPostsTags,
  getPostsByTag
}
