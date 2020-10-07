import { configureStore } from '@reduxjs/toolkit'

import chatsReducer from '@slices/chatsSlice'
import authReducer from '@slices/authSlice'
import themeReducer from '@slices/themeSlice'
import loadingReducer from '@slices/loadingSlice'

export default configureStore({
  reducer: {
    chats: chatsReducer,
    auth: authReducer,
    theme: themeReducer,
    loading: loadingReducer
  }
})
