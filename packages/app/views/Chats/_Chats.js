// Packages
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { animateScroll } from 'react-scroll'

// Local Components
import Conversations from './components/Conversations'
import Messages from './components/Messages'
import Form from './components/Form'

// Utils
import sortConversations from '@utils/sortConversations'

// Services
import { conversationsGetByUserId } from '@services/chats'

// Contexts
import { useSocket } from '@contexts/SocketContext'

// Reducers
import { conversationsByUserIdReducer } from '@slices/chatsSlice'
import { selectedConversationReducer } from '@slices/chatsSlice'
import { updateConversationsReducer } from '@slices/chatsSlice'
import { isLoadingReducer } from '@slices/loadingSlice'

// MUI
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  card: { height: '100%', maxHeight: '100%' },
  rootGrid: { height: '100%', maxHeight: '100%' },
  gridItem: { height: '100%', maxHeight: '100%' },
  rootGridMessages: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%'
  }
})

const Chats = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { socket } = useSocket()
  const { isLoading } = useSelector(state => state.loading)

  useEffect(() => {
    handleGetConversationsByUserId()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('update-conversation', data => {
        handleUpdateConversation(data)
        handleSelectedConversation(data)
        scrollToBottom()
      })
    }
  }, [socket])

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({ duration: 0, containerId: 'chatWindow' })
  }

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

  const handleUpdateConversation = data => {
    dispatch(updateConversationsReducer(data))
  }

  return (
    !isLoading && (
      <Card variant="outlined" className={classes.card}>
        <Grid container className={classes.rootGrid}>
          <Grid className={classes.gridItem} item>
            <Conversations handleSelectedConversation={handleSelectedConversation} />
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid className={classes.gridItem} item xs>
            <div className={classes.rootGridMessages}>
              <Messages />
              <Divider />
              <Form />
            </div>
          </Grid>
        </Grid>
      </Card>
    )
  )
}

export default Chats
