// Packages
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { useSelector, useDispatch } from 'react-redux'
import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js'

// DraftJs Plugins
import hashtagDecoratorPlugin from '@components/DraftJsEditor/plugins/hashtagDecoratorPlugin'
import hashtagEntityPlugin from '@components/DraftJsEditor/plugins/hashtagEntityPlugin'
import linkDecoratorPlugin from '@components/DraftJsEditor/plugins/linkDecoratorPlugin'
import linkEntityPlugin from '@components/DraftJsEditor/plugins/linkEntityPlugin'

// Global Component
import DraftJsEditor from '@components/DraftJsEditor'
import UserAvatar from '@components/UserAvatar'

// Local Components
import DeleteDialog from './components/DeleteDialog'

// Redux
import { updateConversationsReducer, selectedConversationReducer } from '@slices/chatsSlice'

// Services
import { messageDelete, messageUpdate } from '@services/chats'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const useStyles = makeStyles({
  deleteIcon: { visibility: 'hidden' },
  rootGrid: { '&:hover $deleteIcon': { visibility: 'inherit' } }
})

const MessageItem = ({ message, receiver }) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.auth)
  const classes = useStyles()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const plugins = [
    linkEntityPlugin,
    hashtagEntityPlugin,
    linkDecoratorPlugin,
    hashtagDecoratorPlugin
  ]

  const decorators = new CompositeDecorator(plugins)

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(message.contentRaw)), decorators)
  )

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(message.contentRaw)), decorators)
    )
  }, [message])

  useEffect(() => {
    if (!message.isSeen && message.receiver === currentUser._id) {
      handleUpdateMessage()
    }
  }, [])

  async function handleDeleteMessage(messageId) {
    setOpenDeleteDialog(false)
    const updatedConversation = await messageDelete({ messageId })
    dispatch(updateConversationsReducer(updatedConversation.data))
    dispatch(selectedConversationReducer(updatedConversation.data))
  }

  async function handleUpdateMessage() {
    const updatedConversation = await messageUpdate({ message })
    dispatch(updateConversationsReducer(updatedConversation.data))
    dispatch(selectedConversationReducer(updatedConversation.data))
  }

  return (
    <Grid
      key={message._id}
      container
      alignItems="flex-start"
      justify={message.sender === receiver._id ? 'flex-start' : 'flex-end'}
      spacing={1}
      wrap="nowrap"
      className={classes.rootGrid}
    >
      {message.sender === receiver._id && (
        <Grid item>
          <UserAvatar hideOnlineStatus user={receiver} height={28} width={28} />
        </Grid>
      )}
      <Grid item>
        {message.sender !== receiver._id && !message.isDeleted && (
          <>
            <IconButton
              size="small"
              className={classes.deleteIcon}
              onClick={() => setOpenDeleteDialog(true)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <DeleteDialog
              message={message}
              handleDeleteMessage={handleDeleteMessage}
              openDeleteDialog={openDeleteDialog}
              setOpenDeleteDialog={setOpenDeleteDialog}
            />
          </>
        )}
      </Grid>
      <Grid item>
        <Tooltip arrow title={<Moment format="MMM D, Y, HH:mm a">{message.dateCreated}</Moment>}>
          <Card
          // style={{
          //   background:
          //     message.sender !== receiver._id
          //       ? isDarkTheme
          //         ? '#303030'
          //         : '#bdbdbd'
          //       : isDarkTheme
          //       ? '#606060'
          //       : '#ebebeb',
          //   boxShadow: 'none'
          // }}
          >
            <CardContent style={{ padding: 10 }}>
              <DraftJsEditor readOnly editorState={editorState} setEditorState={setEditorState} />
            </CardContent>
          </Card>
        </Tooltip>
      </Grid>
      <Grid item>
        {message.sender !== receiver._id &&
          (message.isSeen ? (
            <Tooltip
              title={
                <>
                  Seen <Moment format="MMM D, Y, HH:mm a">{message.dateIsSeen}</Moment>
                </>
              }
            >
              <CheckCircleOutlineIcon fontSize="small" color="secondary" />
            </Tooltip>
          ) : (
            <Tooltip title="Not seen yet">
              <CheckCircleOutlineIcon fontSize="small" />
            </Tooltip>
          ))}
      </Grid>
    </Grid>
  )
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired
}

export default MessageItem
