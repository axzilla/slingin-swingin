// Packages
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Local Components
import Conversations from './components/Conversations'
import Messages from './components/Messages'
import Form from './components/Form'

// Utils
import sortConversations from '@utils/sortConversations'

// Services
import { conversationsGetByUserId } from '@services/chats'

// Reducers
import { selectedConversationReducer, conversationsByUserIdReducer } from '@slices/chatsSlice'
import { isLoadingReducer } from '@slices/loadingSlice'

// MUI
import { makeStyles } from '@material-ui/styles'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

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
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.loading)
  const { conversations, selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.currentUser)
  const users = selectedConversation && selectedConversation.users
  const receiver = users && users.filter(user => user._id !== sender._id)[0]

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

  const hasConversations = conversations.length > 0

  return (
    !isLoading && (
      <Grid container className={classes.rootGrid}>
        {hasConversations && sender && receiver && users ? (
          <>
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
                <Form
                  handleSetConversations={handleSetConversations}
                  handleSelectedConversation={handleSelectedConversation}
                />
              </div>
            </Grid>
          </>
        ) : (
          <CardContent style={{ width: '100%' }}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  You don&rsquo;t have any conversations yet.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" align="center">
                  Go to a profile and send a message to start your first conversion.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Button
                    onClick={() => router.back()}
                    variant="outlined"
                    color="secondary"
                    size="large"
                  >
                    Go Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Grid>
    )
  )
}

export default Chats
