// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

function DeleteDialog({ message, openDeleteDialog, setOpenDeleteDialog, handleDeleteMessage }) {
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
      aria-labelledby={`${message._id}-title`}
      aria-describedby={`${message._id}-description`}
    >
      <DialogTitle id={`${message._id}-title`}>Delete Message?</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined" size="small">
          Cancel
        </Button>
        <Button
          onClick={() => handleDeleteMessage(message._id)}
          color="secondary"
          variant="contained"
          autoFocus
          size="small"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  message: PropTypes.object.isRequired,
  openDeleteDialog: PropTypes.bool.isRequired,
  setOpenDeleteDialog: PropTypes.func.isRequired,
  handleDeleteMessage: PropTypes.func.isRequired
}

export default DeleteDialog
