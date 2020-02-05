import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from '@material-ui/core/Divider'

function Modal({ setAvatarOpen, avatarOpen, handleAvatarDelete }) {
  const handleClose = () => {
    setAvatarOpen(false)
  }

  return (
    <Dialog
      open={avatarOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to remove youre profile picture?
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleAvatarDelete} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Modal.propTypes = {
  avatarOpen: PropTypes.bool,
  setAvatarOpen: PropTypes.func,
  handleAvatarDelete: PropTypes.func
}

export default Modal
