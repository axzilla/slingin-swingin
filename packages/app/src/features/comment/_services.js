import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

export const createComment = async commentData => {
  return await axios.post(`${apiURL}/comments`, commentData)
}

export const getCommentsByPostRef = async postRef => {
  return await axios.get(`${apiURL}/comments/${postRef}`)
}

export const getCommentsByUserId = async userId => {
  return await axios.get(`${apiURL}/comments/getByUserId/${userId}`)
}

export const updateComment = async commentData => {
  return await axios.post(`${apiURL}/comments/update`, commentData)
}

export const deleteComment = async commentId => {
  return await axios.post(`${apiURL}/comments/delete`, { commentId })
}

export const updateCommentlikes = async commentId => {
  return await axios.post(`${apiURL}/comments/likes/${commentId}`)
}

export default {
  createComment,
  getCommentsByPostRef,
  getCommentsByUserId,
  updateComment,
  deleteComment,
  updateCommentlikes
}
