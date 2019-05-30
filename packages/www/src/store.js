import { configureStore, combineReducers } from 'redux-starter-kit'

import authReducer from './features/auth/_reducers'
import profileReducer from './features/profile/_reducers'
import postReducer from './features/post/_reducers'
import searchReducer from './features/search/_reducers'
import commentReducer from './features/comment/_reducers'
import alertReducer from './features/common/_reducers'

const reducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  comments: commentReducer,
  searchResult: searchReducer,
  alert: alertReducer
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'production' ? false : true
})

export default store
