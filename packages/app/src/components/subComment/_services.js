import axios from 'axios'

export function createSubComment(subCommentData) {
  return axios.post(`/subComments`, subCommentData)
}

export function getSubCommentByPostRef(postId) {
  return axios.get(`/subComments/get-by-post-ref/${postId}`)
}

export function getSubCommentByCommentRef(commentId) {
  return axios.get(`/subComments/get-by-comment-ref/${commentId}`)
}

export function updateSubComment(subCommentData) {
  return axios.put(`/subComments/`, subCommentData)
}

export function deleteSubComment(subCommentId) {
  return axios.delete(`/subComments/${subCommentId}`)
}
