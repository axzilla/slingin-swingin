import { createSlice } from '@reduxjs/toolkit'

export const onlineListSlice = createSlice({
  name: 'onlineList',
  initialState: {
    users: [],
    guests: 0
  },
  reducers: {
    handleUsers: (state, action) => {
      state.users = action.payload
    },
    handleGuests: (state, action) => {
      state.guests = action.payload
    }
  }
})

export const { handleUsers, handleGuests } = onlineListSlice.actions
export const onlineList = state => state.onLineList
export default onlineListSlice.reducer
