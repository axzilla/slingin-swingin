import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

const addPost = postData => {
  return axios.post(`${apiURL}/posts/create`, postData)
}

const editPost = postData => {
  return axios.post(`${apiURL}/posts/edit`, postData)
}

const getPost = postId => {
  return axios.get(`${apiURL}/posts/${postId}`)
}

const getPosts = () => {
  return axios.get(`${apiURL}/posts`)
}

const getPostByShortId = postId => {
  return axios.get(`${apiURL}/posts/short/${postId}`)
}

const getPostsByUserId = id => {
  return axios.get(`${apiURL}/posts/getPosts/published/userId/${id}`)
}

const getDraftPostsByUserId = id => {
  return axios.get(`${apiURL}/posts/getPosts/draft/userId/${id}`)
}

const getPostsByUserBookmark = userId => {
  return axios.get(`${apiURL}/posts/getposts/bookmark/${userId}`)
}

const getPostsByTag = tag => {
  return axios.get(`${apiURL}/posts/getposts/tag/${tag}`)
}

const deletePost = (id, history) => {
  return axios.delete(`${apiURL}/posts/${id}`)
}

const handlePostLikes = postId => {
  return axios.post(`${apiURL}/posts/like/${postId}`)
}

const handlePostBookmarks = postId => {
  return axios.post(`${apiURL}/posts/bookmark/${postId}`)
}

const getPostsTags = () => {
  return axios.get(`${apiURL}/posts/getAllTags/`)
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
