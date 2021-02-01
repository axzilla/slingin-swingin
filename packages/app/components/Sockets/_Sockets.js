// Packages
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { updateConversationsReducer, selectedConversationReducer } from '@slices/chatsSlice'
import { conversationsByUserIdReducer } from '@slices/chatsSlice'
import { setMessagesNotificationsReducer } from '@slices/notificationsSlice'
import { isLoadingReducer } from '@slices/loadingSlice'
import { setOnlineUsersReducer } from '@slices/onlineUsersSlice'

// Contexts
import { useSocket } from '@contexts/SocketContext'

// Utils
import sortConversations from '@utils/sortConversations'

// Services
import { conversationsGetByUserId } from '@services/chats'

function Sockets() {
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const { isAuthenticated, currentUser } = useSelector(state => state.auth)
  const { conversations } = useSelector(state => state.chats)

  useEffect(() => {
    if (socket) {
      socket.on('chats', updatedConversation => {
        dispatch(updateConversationsReducer(updatedConversation))
        dispatch(selectedConversationReducer(updatedConversation))

        const hasUnreadMessages = updatedConversation.messages.some(message => {
          return !message.isSeen && message.receiver === currentUser._id
        })

        if (hasUnreadMessages) {
          dispatch(setMessagesNotificationsReducer(true))
        } else {
          dispatch(setMessagesNotificationsReducer(false))
        }
      })

      socket.on('online', users => {
        dispatch(setOnlineUsersReducer(users))
        console.log(users) // eslint-disable-line
      })
    }
  }, [socket])

  useEffect(() => {
    if (isAuthenticated) handleGetConversationsByUserId()

    if (!isAuthenticated && socket) {
      socket.disconnect()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const hasUnreadMessages = conversations.some(conversation => {
      return conversation.messages.some(message => {
        return !message.isSeen && message.receiver === currentUser._id
      })
    })

    if (hasUnreadMessages) {
      dispatch(setMessagesNotificationsReducer(true))
    } else {
      dispatch(setMessagesNotificationsReducer(false))
    }
  }, [conversations])

  const handleGetConversationsByUserId = async () => {
    await handleIsLoading(true)
    const { data } = await conversationsGetByUserId()
    const sortedConversations = await sortConversations(data)
    await handleSetConversations(sortedConversations)
    await handleSelectedConversation(sortedConversations[0])
    handleIsLoading(false)
  }

  const handleIsLoading = async data => {
    await dispatch(isLoadingReducer(data))
  }

  const handleSetConversations = async data => {
    await dispatch(conversationsByUserIdReducer(data))
  }

  const handleSelectedConversation = async data => {
    await dispatch(selectedConversationReducer(data))
  }

  return null
}

export default Sockets
