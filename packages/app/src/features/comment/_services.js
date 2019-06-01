import axios from 'axios'

export const createComment = async commentData => {
  return await axios.post(`/comments`, commentData)
}

export const getCommentsByPostRef = async postRef => {
  return await axios.get(`/comments/${postRef}`)
}

export const getCommentsByUserId = async userId => {
  return await axios.get(`/comments/getByUserId/${userId}`)
}

export const updateComment = async commentData => {
  return await axios.post(`/comments/update`, commentData)
}

export const deleteComment = async commentId => {
  return await axios.post(`/comments/delete`, { commentId })
}

export const updateCommentlikes = async commentId => {
  console.log(commentId)
  return await axios.post(`/comments/likes/${commentId}`)
}

export default {
  createComment,
  getCommentsByPostRef,
  getCommentsByUserId,
  updateComment,
  deleteComment,
  updateCommentlikes
}
