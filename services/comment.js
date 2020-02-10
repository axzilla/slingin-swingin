import axios from 'axios'

const rootUrl = `${process.env.BOUNCE_APP_API_URL}/comments`

export function commentCreate(commentData) {
  return axios.post(`${rootUrl}/comment-create`, commentData)
}

export function commentUpdate(commentData) {
  return axios.patch(`${rootUrl}/comment-update`, commentData)
}

export function commentDelete(commentId) {
  return axios.delete(`${rootUrl}/comment-delete`, { data: { commentId } })
}

export function commentUpvote(commentId) {
  return axios.post(`${rootUrl}/comment-upvote/${commentId}`)
}

export function commentDownvote(commentId) {
  return axios.post(`${rootUrl}/comment-downvote/${commentId}`)
}

export function getCommentsByPostRef(postRef) {
  return axios.get(`${rootUrl}/get-comments-by-post-ref/${postRef}`)
}

export function getCommentsByUserId(userId) {
  return axios.get(`${rootUrl}/get-comments-by-user-id/${userId}`)
}
