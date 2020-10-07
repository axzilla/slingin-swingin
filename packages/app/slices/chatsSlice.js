import { createSlice } from '@reduxjs/toolkit'

import sortConversations from '@utils/sortConversations'

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    conversations: [],
    selectedConversation: {}
  },
  reducers: {
    conversationsByUserIdReducer: (state, action) => {
      state.conversations = action.payload
    },
    selectedConversationReducer: (state, action) => {
      state.selectedConversation = action.payload
    },
    updateConversationsReducer: (state, action) => {
      const updatedConversation = action.payload
      const conversationIds = state.conversations.map(item => item._id)
      const conversationIndex = conversationIds.indexOf(updatedConversation._id)

      state.conversations = [
        ...sortConversations([
          ...state.conversations.slice(0, conversationIndex),
          updatedConversation,
          ...state.conversations.slice(conversationIndex + 1)
        ])
      ]
    }
  }
})

export const {
  conversationsByUserIdReducer,
  updateConversationsReducer,
  selectedConversationReducer
} = chatsSlice.actions

export const conversations = state => state.conversations
export const messages = state => state.messages
export default chatsSlice.reducer
