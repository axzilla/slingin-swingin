import { createSlice } from '@reduxjs/toolkit'

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    messages: true
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
