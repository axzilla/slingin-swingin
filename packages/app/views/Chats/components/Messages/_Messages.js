// Packages
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { animateScroll } from 'react-scroll'

// Local Components
import MessageItem from './components/MessageItem'

// Global Components
import UserAvatar from '@components/UserAvatar'
import Link from '@components/Link'

// MUI
import { makeStyles } from '@material-ui/styles'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  chatWindow: { height: '100%', maxHeight: '100%', overflowY: 'scroll' },
  cardHeader: { minHeight: '70px' }
})

const Messages = () => {
  const router = useRouter()
  const classes = useStyles()
  const { conversations, selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.currentUser)
  const users = selectedConversation && selectedConversation.users
  const receiver = users && users.filter(user => user._id !== sender._id)[0]

  useEffect(() => {
    scrollToBottom()
  }, [conversations])

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({ duration: 0, containerId: 'chatWindow' })
  }

  return conversations.length > 0 ? (
    <>
      <CardHeader
        className={classes.cardHeader}
        title={
          <Link underlined href={`/${receiver.username}`}>
            @{receiver.username}
          </Link>
        }
        subheader={
          <Link underlined href={`/${receiver.username}`}>
            {receiver.name || ''}
          </Link>
        }
        avatar={
          <Link underlined href={`/${receiver.username}`}>
            <UserAvatar user={receiver} />
          </Link>
        }
      />
      <Divider />
      <CardContent className={classes.chatWindow} id="chatWindow">
        {[...selectedConversation.messages]
          .sort((a, b) => {
            if (a.dateCreated > b.dateCreated) {
              return 1
            }

            if (a.dateCreated < b.dateCreated) {
              return -1
            }

            return 0
          })
          .map(message => {
            return <MessageItem key={message._id} message={message} receiver={receiver} />
          })}
      </CardContent>
    </>
  ) : (
    <CardContent className={classes.chatWindow}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            You don&rsquo;t have any conversations yet.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            Go to a profile and send a message to start your first conversion.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Button onClick={() => router.back()} variant="contained" color="secondary">
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default Messages
