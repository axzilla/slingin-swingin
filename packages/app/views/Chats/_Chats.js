// Packages
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Local Components
import Conversations from './components/Conversations'
import Messages from './components/Messages'
import Form from './components/Form'

// Utils
import sortConversations from '@utils/sortConversations'

// Services
import { conversationsGetByUserId } from '@services/chats'

// Reducers
import { conversationsByUserIdReducer } from '@slices/chatsSlice'
import { selectedConversationReducer } from '@slices/chatsSlice'
import { isLoadingReducer } from '@slices/loadingSlice'

// MUI
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  card: { height: '100%', maxHeight: '100%' },
  rootGrid: {
    height: 'calc(100vh - 65px)', // Topbar 65px
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 121px)' // Topbar 65px + BottomNavbar 56px
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 113px)' // Topbar 57px + BottomNavbar 65px
    }
  },
  gridItem: { height: '100%', maxHeight: '100%' },
  rootGridMessages: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%'
  }
}))

const Chats = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.loading)

  useEffect(() => {
    handleGetConversationsByUserId()
  }, [])

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

  return (
    !isLoading && (
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
    )
  )
}

export default Chats
