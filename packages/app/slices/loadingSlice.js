// Packages
import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: false },
  reducers: {
    isLoadingReducer: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { isLoadingReducer } = loadingSlice.actions

export const isLoading = state => state.isLoading

export default loadingSlice.reducer
