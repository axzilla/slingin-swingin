// Packages
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// Global Components
import UserAvatar from '@components/UserAvatar'

// Contexts
import { useSocket } from '@contexts/SocketContext'

// MUI
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Hidden from '@material-ui/core/Hidden'

const ConversationItem = ({ conversation, handleSelectedConversation }) => {
  const { socket } = useSocket()
  const { selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.user)
  const receiver = conversation.users.filter(user => user._id !== sender.id)[0]

  useEffect(() => {
    socket && socket.emit('join-room', conversation._id)
  }, [socket])

  return (
    <ListItem
      key={conversation._id}
      button
      selected={conversation._id === selectedConversation._id}
      onClick={() => handleSelectedConversation(conversation)}
    >
      <ListItemAvatar>
        <UserAvatar height={50} width={50} user={receiver} />
      </ListItemAvatar>
      <Hidden smDown>
        <ListItemText primary={`@${receiver.username}`} secondary={receiver.profile.name || ''} />
      </Hidden>
    </ListItem>
  )
}

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  handleSelectedConversation: PropTypes.func.isRequired
}

export default ConversationItem
