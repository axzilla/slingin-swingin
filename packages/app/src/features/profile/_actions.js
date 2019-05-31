import { createAction } from 'redux-starter-kit'

import { searchFunc } from '../search/_actions'
import { setAlert } from '../common/_actions'

import api from './_services'

export const setProfile = createAction('setProfile')
export const setCurrentProfile = createAction('setCurrentProfile')
export const setProfiles = createAction('setProfiles')
export const setUpdatedProfile = createAction('setUpdatedProfile')
export const setProfilesByFollowerId = createAction('setProfilesByFollowerId')
export const setProfilesByFollowingId = createAction('setProfilesByFollowingId')
export const profileLoading = createAction('profileLoading')
// export const clearCurrentProfile = createAction('clearCurrentProfile')
export const setProfileErrors = createAction('setProfileErrors')
export const clearProfileErrors = createAction('clearProfileErrors')

export const getCurrentProfile = () => dispatch => {
  api
    .getCurrentProfile()
    .then(async res => dispatch(setCurrentProfile(res.data)))
    .catch(err => dispatch(setCurrentProfile({})))
}

export const getProfiles = () => dispatch => {
  api
    .getProfiles()
    .then(res => dispatch(setProfiles(res.data)))
    .catch(err => dispatch(setProfiles(null)))
}

export const getProfileByHandle = handle => async dispatch => {
  await api
    .getProfileByHandle(handle)
    .then(res => dispatch(setProfile(res.data)))
    .catch(err => dispatch(setProfile(null)))
}

export const getProfilesByFollowingId = id => dispatch => {
  api
    .getProfilesByFollowingId(id)
    .then(res => dispatch(setProfilesByFollowingId(res.data)))
    .catch(err => dispatch(setProfile(null)))
}

export const getProfilesByFollowerId = id => dispatch => {
  api
    .getProfilesByFollowerId(id)
    .then(res => dispatch(setProfilesByFollowerId(res.data)))
    .catch(err => dispatch(setProfile(null)))
}

export const createProfile = profileData => dispatch => {
  api
    .createProfile(profileData)
    .then(res => {
      dispatch(setUpdatedProfile(res.data))
      dispatch(setAlert({ variant: 'success', message: 'Profil gespeichert' }))
    })
    .catch(err => dispatch(setProfileErrors(err.response.data)))
}

export const handleUserFollower = (
  location,
  followedUserId,
  profileDetailsUserId,
  profile_handle,
  searchString
) => dispatch => {
  api
    .handleUserFollower(followedUserId)
    .then(res => {
      if (location === 'profileDetails') {
        dispatch(getProfileByHandle(profile_handle))
        dispatch(getProfilesByFollowerId(profileDetailsUserId))
      }

      if (location === 'getProfiles') {
        dispatch(getProfiles())
      }

      if (location === 'getProfilesByFollowingId') {
        dispatch(getProfilesByFollowingId(profileDetailsUserId))
      }

      if (location === 'getProfilesByFollowerId') {
        dispatch(getProfilesByFollowerId(profileDetailsUserId))
        dispatch(getProfilesByFollowingId(profileDetailsUserId))
      }

      if (location === 'getProfilesBySearch' && searchString) {
        dispatch(searchFunc(searchString))
      }
    })
    .catch(err => dispatch(setProfileErrors(err.response.data)))
}
