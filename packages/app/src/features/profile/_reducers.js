import { createReducer } from 'redux-starter-kit'

const initialState = {
  profile: null,
  currentProfile: null,
  profiles: null,
  profilesByFollowingId: null,
  profilesByFollowerId: null,
  loading: false,
  errors: {}
}

const profileLoading = (state, { payload }) => {
  state.loading = true
}

const setProfile = (state, { payload }) => {
  state.profile = payload
}

const setUpdatedProfile = (state, { payload }) => {
  state.profile = payload.profile
}

const setProfiles = (state, { payload }) => {
  state.profiles = payload
  state.loading = false
}

const setProfilesByFollowingId = (state, { payload }) => {
  state.profilesByFollowingId = payload
  state.loading = false
}

const setProfilesByFollowerId = (state, { payload }) => {
  state.profilesByFollowerId = payload
  state.loading = false
}

const setCurrentProfile = (state, { payload }) => {
  state.currentProfile = payload
}

const clearCurrentProfile = (state, { payload }) => {
  state.currentProfile = null
}

const setProfileErrors = (state, { payload }) => {
  state.errors = payload
}

const clearProfileErrors = (state, { payload }) => {
  state.errors = {}
}

export default createReducer(initialState, {
  profileLoading,
  setProfile,
  setUpdatedProfile,
  setProfiles,
  setProfilesByFollowingId,
  setProfilesByFollowerId,
  clearCurrentProfile,
  setCurrentProfile,
  setProfileErrors,
  clearProfileErrors
})
