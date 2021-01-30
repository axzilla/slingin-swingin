// Packages
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// Global Components
import UserAvatar from '@components/UserAvatar'

// MUI
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Hidden from '@material-ui/core/Hidden'

const ConversationItem = ({ conversation, handleSelectedConversation }) => {
  const { selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.currentUser)
  const receiver = conversation.users.filter(user => user._id !== sender._id)[0]

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
        <ListItemText primary={`@${receiver.username}`} secondary={receiver.name || ''} />
      </Hidden>
    </ListItem>
  )
}

ConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  handleSelectedConversation: PropTypes.func.isRequired
}

export default ConversationItem
