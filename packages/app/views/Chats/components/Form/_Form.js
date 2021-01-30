// Packages
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { EditorState, convertToRaw } from 'draft-js'

// Global Components
import DraftJsEditor from '@components/DraftJsEditor'

// Services
import { messageCreate } from '@services/chats'

// MUI
import { makeStyles } from '@material-ui/styles'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles({
  form: { display: 'flex', alignItems: 'flex-end', maxWidth: '100%' },
  editorContainer: { width: 'calc(100% - 48px)' }
})

const Form = () => {
  const classes = useStyles()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { conversations, selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.currentUser)
  const users = selectedConversation && selectedConversation.users
  const receiver = users && users.filter(user => user._id !== sender._id)[0]

  const hasText = editorState.getCurrentContent().hasText()

  const handleSubmit = async () => {
    try {
      await messageCreate({
        receiver: receiver,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      })

      setEditorState(EditorState.createEmpty())
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <CardContent>
      {conversations.length > 0 && (
        <div className={classes.form}>
          <div className={classes.editorContainer}>
            <DraftJsEditor
              editorState={editorState}
              setEditorState={setEditorState}
              placeholder="Write a message ..."
              maxHeight={200}
            />
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Tooltip
              placement="top"
              title="Press enter to send. Press the Shift and Enter keys to add a new paragraph."
            >
              <IconButton
                type="submit"
                disabled={!hasText}
                onClick={() => handleSubmit(editorState)}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
    </CardContent>
  )
}

export default Form
