import { createReducer } from 'redux-starter-kit'

const initialState = { message: null, variant: null }

const setAlert = (state, { payload }) => {
  state.message = payload.message
  state.variant = payload.variant
}

export default createReducer(initialState, {
  setAlert
})
