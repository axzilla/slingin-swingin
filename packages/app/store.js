import { configureStore } from '@reduxjs/toolkit'

import chatsReducer from '@slices/chatsSlice'
import authReducer from '@slices/authSlice'
import themeReducer from '@slices/themeSlice'
import loadingReducer from '@slices/loadingSlice'
import notificationsReducer from '@slices/notificationsSlice'
import onlineUsersReducer from '@slices/onlineUsersSlice'

export default configureStore({
  reducer: {
    chats: chatsReducer,
    auth: authReducer,
    theme: themeReducer,
    loading: loadingReducer,
    notifications: notificationsReducer,
    onlineUsers: onlineUsersReducer
  }
})
