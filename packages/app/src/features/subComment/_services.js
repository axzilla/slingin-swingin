import axios from 'axios'

export const createSubComment = async subCommentData => {
  return await axios.post(`/subComments`, subCommentData)
}

export const getSubCommentByCommentId = async commentId => {
  return await axios.get(`/subComments/${commentId}`)
}

export const updateSubComment = async subCommentData => {
  return await axios.put(`/subComments/`, subCommentData)
}

export const deleteSubComment = async subCommentId => {
  return await axios.delete(`/subComments/${subCommentId}`)
}
