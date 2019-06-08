import axios from 'axios'

export async function createComment(commentData) {
  return await axios.post(`/comments`, commentData)
}

export async function getCommentsByPostRef(postRef) {
  return await axios.get(`/comments/${postRef}`)
}

export async function getCommentsByUserId(userId) {
  return await axios.get(`/comments/getByUserId/${userId}`)
}

export async function updateComment(commentData) {
  return await axios.post(`/comments/update`, commentData)
}

export async function deleteComment(commentId) {
  return await axios.post(`/comments/delete`, { commentId })
}

export async function upvoteComment(commentId) {
  return await axios.post(`/comments/upvote/${commentId}`)
}

export async function downvoteComment(commentId) {
  return await axios.post(`/comments/downvote/${commentId}`)
}
