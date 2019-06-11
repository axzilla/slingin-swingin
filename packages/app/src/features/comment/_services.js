import axios from 'axios'

export function createComment(commentData) {
  return axios.post(`/comments`, commentData)
}

export function getCommentsByPostRef(postRef) {
  return axios.get(`/comments/${postRef}`)
}

export function getCommentsByUserId(userId) {
  return axios.get(`/comments/getByUserId/${userId}`)
}

export function updateComment(commentData) {
  return axios.post(`/comments/update`, commentData)
}

export function deleteComment(commentId) {
  return axios.post(`/comments/delete`, { commentId })
}

export function upvoteComment(commentId) {
  return axios.post(`/comments/upvote/${commentId}`)
}

export function downvoteComment(commentId) {
  return axios.post(`/comments/downvote/${commentId}`)
}
