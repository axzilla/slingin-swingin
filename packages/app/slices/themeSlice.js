// Packages
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDarkTheme: cookies.get('isDarkTheme') === 'true' ? true : false },
  reducers: {
    switchThemeReducer: state => {
      cookies.set('isDarkTheme', !state.isDarkTheme)
      state.isDarkTheme = !state.isDarkTheme
    }
  }
})

export const { switchThemeReducer } = themeSlice.actions

export const theme = state => state.theme

export default themeSlice.reducer
