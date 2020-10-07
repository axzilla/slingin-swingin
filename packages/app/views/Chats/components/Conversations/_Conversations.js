// Packages
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// Local Components
import ConversationItem from './components/ConversationItem'

// MUI
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles({
  list: { width: '100' },
  cardHeader: { minHeight: '70px' }
})

const Conversations = ({ handleSelectedConversation }) => {
  const classes = useStyles()
  const { conversations } = useSelector(state => state.chats)

  return (
    <>
      <CardHeader className={classes.cardHeader} title={<Hidden smDown>Conversations</Hidden>} />
      <Divider />
      <List className={classes.list}>
        {[...conversations].map(conversation => {
          return (
            <ConversationItem
              key={conversation._id}
              handleSelectedConversation={handleSelectedConversation}
              conversation={conversation}
            />
          )
        })}
      </List>
    </>
  )
}

Conversations.propTypes = {
  handleSelectedConversation: PropTypes.func.isRequired
}

export default Conversations
