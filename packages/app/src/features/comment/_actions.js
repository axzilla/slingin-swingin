import { createAction } from 'redux-starter-kit'

import api from './_services'

import { setAlert } from '../common/_actions'

export const setCommentsByPostRef = createAction('setCommentsByPostRef')
export const setCommentsByUserId = createAction('setCommentsByUserId')
export const setCommentErrors = createAction('setCommentErrors')
export const clearCommentErrors = createAction('clearCommentErrors')

export const createComment = commentData => dispatch => {
  api
    .createComment(commentData)
    .then(() => {
      dispatch(getCommentsByPostRef(commentData.refPostShortId))
      dispatch(
        setAlert({
          message: 'Kommentar efolgreich erstellt',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setCommentErrors(err.response.data)))
}

export const getCommentsByPostRef = postShortId => dispatch => {
  api
    .getCommentsByPostRef(postShortId)
    .then(res => dispatch(setCommentsByPostRef(res.data)))
    .catch(err => dispatch(setCommentErrors(err.response.data)))
}

export const getCommentsByUserId = userId => dispatch => {
  api
    .getCommentsByUserId(userId)
    .then(res => dispatch(setCommentsByUserId(res.data)))
    .catch(err => dispatch(setCommentErrors(err.response.data)))
}

export const updateComment = commentData => dispatch => {
  api
    .updateComment(commentData)
    .then(() => {
      dispatch(getCommentsByPostRef(commentData.refPostShortId))
      dispatch(
        setAlert({
          message: 'Kommentar erfolgreich bearbeitet',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setCommentErrors(err.response.data)))
}

export const deleteComment = commentId => dispatch => {
  api
    .deleteComment(commentId)
    .then(res => {
      dispatch(getCommentsByPostRef(res.data.shortId))
      dispatch(
        setAlert({
          message: 'Kommentar erfolgreich gelöscht',
          variant: 'success'
        })
      )
    })
    .catch(err => dispatch(setCommentErrors(err.response.data)))
}

export const updateCommentlikes = comment => dispatch => {
  api
    .updateCommentlikes(comment._id)
    .then(() => dispatch(getCommentsByPostRef(comment.refPostShortId)))
    .catch(err => dispatch(setCommentErrors(err.response.data)))
}
