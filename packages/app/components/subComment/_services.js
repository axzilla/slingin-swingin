import axios from 'axios'

const rootUrl = `${process.env.CODEHUSTLA_API_URL}/subcomments`

export function subCommentCreate(subCommentData) {
  return axios.post(`${rootUrl}/create`, subCommentData)
}

export function subCommentUpdate(subCommentData) {
  return axios.patch(`${rootUrl}/update`, subCommentData)
}

export function subCommentDelete(subCommentId) {
  return axios.delete(`${rootUrl}/delete`, { data: { subCommentId } })
}

export function getSubCommentByPostRef(postId) {
  return axios.get(`${rootUrl}/get-subcomment-by-post-ref/${postId}`)
}

export function getSubCommentsByUserId(userId) {
  return axios.get(`${rootUrl}/get-subcomment-by-user-id/${userId}`)
}

export function getSubCommentsByCommentRef(commentId) {
  return axios.get(`${rootUrl}/get-subcomment-by-comment-ref/${commentId}`)
}
