import { configureStore } from '@reduxjs/toolkit'

import onlineListReducer from './slices/onlineListReducer'

export default configureStore({
  reducer: {
    onlineList: onlineListReducer
  }
})
