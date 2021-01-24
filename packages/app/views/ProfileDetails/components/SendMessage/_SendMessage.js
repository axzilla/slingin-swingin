// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw } from 'draft-js'

// Services
import { messageCreate } from '@services/chats'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Global Components
import DraftJsEditor from '@components/DraftJsEditor'

// MUI
import Button from '@material-ui/core/Button'
import MailIcon from '@material-ui/icons/Mail'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

function SendMessage({ receiverUsername, receiver }) {
  const { setAlert } = useAlert()
  const [open, setOpen] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    try {
      handleClose()
      setAlert({ message: `Message to @${receiverUsername} sent successfully`, variant: 'success' })
      setEditorState(EditorState.createEmpty())

      messageCreate({
        receiver,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      })
    } catch (error) {
      if (error) throw error
    }
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="secondary"
        startIcon={<MailIcon />}
      >
        Send Message
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Send a message to @{receiverUsername}</DialogTitle>
        <DialogContent>
          <DraftJsEditor
            height={200}
            editorState={editorState}
            setEditorState={setEditorState}
            placeholder="What's on your mind ..."
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSubmit} color="secondary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

SendMessage.propTypes = {
  receiverUsername: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired
}

export default SendMessage
