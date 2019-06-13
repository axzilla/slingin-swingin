import axios from 'axios'

export function createSubComment(subCommentData) {
  return axios.post(`/subComments`, subCommentData)
}

export function getSubCommentByCommentId(commentId) {
  return axios.get(`/subComments/${commentId}`)
}

export function updateSubComment(subCommentData) {
  return axios.put(`/subComments/`, subCommentData)
}

export function deleteSubComment(subCommentId) {
  return axios.delete(`/subComments/${subCommentId}`)
}
