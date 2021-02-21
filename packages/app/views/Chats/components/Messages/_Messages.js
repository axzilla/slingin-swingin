// Packages
import { useEffect } from 'react'
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

const useStyles = makeStyles({
  chatWindow: { height: '100%', maxHeight: '100%', overflowY: 'scroll' },
  cardHeader: { minHeight: '70px' }
})

const Messages = () => {
  const classes = useStyles()
  const { conversations, selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.currentUser)
  const users = selectedConversation && selectedConversation.users
  const receiver = users && users.filter(user => user._id !== sender._id)[0]

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 0)
  }, [conversations])

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({ duration: 0, containerId: 'chatWindow' })
  }

  return (
    <>
      <CardHeader
        className={classes.cardHeader}
        title={
          <Link color="textPrimary" underlined href={`/${receiver.username}`}>
            @{receiver.username}
          </Link>
        }
        subheader={
          <Link color="textPrimary" underlined href={`/${receiver.username}`}>
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
  )
}

export default Messages
