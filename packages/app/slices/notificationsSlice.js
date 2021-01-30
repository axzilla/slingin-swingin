import { createSlice } from '@reduxjs/toolkit'

export const notificationsSlice = createSlice({
  name: 'chats',
  initialState: {
    messages: false
  },
  reducers: {
    setMessagesNotificationsReducer: (state, action) => {
      state.messages = action.payload
    }
  }
})

export const { setMessagesNotificationsReducer } = notificationsSlice.actions

export const messages = state => state.messages
export default notificationsSlice.reducer
