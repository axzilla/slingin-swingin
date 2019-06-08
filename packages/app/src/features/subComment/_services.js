import axios from 'axios'

export async function createSubComment(subCommentData) {
  return await axios.post(`/subComments`, subCommentData)
}

export async function getSubCommentByCommentId(commentId) {
  return await axios.get(`/subComments/${commentId}`)
}

export async function updateSubComment(subCommentData) {
  return await axios.put(`/subComments/`, subCommentData)
}

export async function deleteSubComment(subCommentId) {
  return await axios.delete(`/subComments/${subCommentId}`)
}
