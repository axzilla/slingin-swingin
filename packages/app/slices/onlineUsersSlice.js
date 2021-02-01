// Packages
import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'onlineUsers',
  initialState: {
    users: []
  },
  reducers: {
    setOnlineUsersReducer: (state, action) => {
      state.users = action.payload
    }
  }
})

export const { setOnlineUsersReducer } = authSlice.actions

export const users = state => state.users

export default authSlice.reducer
