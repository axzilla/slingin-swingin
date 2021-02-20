// Packages
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { EditorState, convertToRaw, CompositeDecorator } from 'draft-js'
import { useDispatch } from 'react-redux'

// Global Components
import DraftJsEditor from '@components/DraftJsEditor'

// Services
import { messageCreate } from '@services/chats'

// Redux
import { updateConversationsReducer, selectedConversationReducer } from '@slices/chatsSlice'

// DraftJs Utils
import {
  trimFirstAndLastBlock,
  removeEmptyBlocks,
  createLinkEntities,
  getEntities
} from '@components/DraftJsEditor/utils'

// DraftJs Plugins
import hashtagDecoratorPlugin from '@components/DraftJsEditor/plugins/hashtagDecoratorPlugin'
import linkDecoratorPlugin from '@components/DraftJsEditor/plugins/linkDecoratorPlugin'

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
  const dispatch = useDispatch()
  const classes = useStyles()
  const { conversations, selectedConversation } = useSelector(state => state.chats)
  const sender = useSelector(state => state.auth.currentUser)
  const users = selectedConversation && selectedConversation.users
  const receiver = users && users.filter(user => user._id !== sender._id)[0]

  const plugins = [linkDecoratorPlugin, hashtagDecoratorPlugin]
  const decorators = new CompositeDecorator(plugins)
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorators))

  const hasText = editorState.getCurrentContent().hasText()

  async function handleSubmit() {
    try {
      const newEditorState = createLinkEntities(
        trimFirstAndLastBlock(removeEmptyBlocks(editorState))
      )

      const hashtags = getEntities(newEditorState, 'HASHTAG').map(hashtag => hashtag.data.hashtag)
      const contentRaw = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
      const contentText = newEditorState
        .getCurrentContent()
        .getPlainText()
        .replace(/\s+/g, ' ')
        .trim()

      const updatedConversation = await messageCreate({
        receiver: receiver._id,
        sender: sender._id,
        contentRaw,
        contentText,
        hashtags
      })

      dispatch(updateConversationsReducer(updatedConversation.data))
      dispatch(selectedConversationReducer(updatedConversation.data))

      setEditorState(EditorState.createEmpty(decorators))
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
              {/* span is needed because of MUI Tooltip warning */}
              <span>
                <IconButton
                  type="submit"
                  disabled={!hasText}
                  onClick={() => handleSubmit(editorState)}
                >
                  <SendIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        </div>
      )}
    </CardContent>
  )
}

export default Form
