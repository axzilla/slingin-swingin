import { createReducer } from 'redux-starter-kit'

const initialState = {
  commentsByPostRef: [],
  commentsByUserId: [],
  errors: {}
}

const setCommentsByPostRef = (state, { payload }) => {
  state.commentsByPostRef = payload
}

const setCommentsByUserId = (state, { payload }) => {
  state.commentsByUserId = payload
}

const setCommentErrors = (state, { payload }) => {
  state.errors = payload
}

const clearCommentErrors = state => {
  state.errors = {}
}

export default createReducer(initialState, {
  setCommentsByPostRef,
  setCommentsByUserId,
  setCommentErrors,
  clearCommentErrors
})
