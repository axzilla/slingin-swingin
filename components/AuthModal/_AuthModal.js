import React, { useContext } from 'react'

import AuthContext from '@contexts/AuthContext'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function AuthModal() {
  const { isAuthModal, setIsAuthModal } = useContext(AuthContext)

  const handleClose = () => {
    setIsAuthModal(false)
  }

  return (
    <Dialog
      open={isAuthModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        This feature is for registered bounce.dev members only!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This feature is for registered bounce.dev members only.
          <br />
          <br />
          Log in to your account or create an account for FREE if you haven`t done so and join the
          coolest community of music lovers that are already on bounce.dev!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthModal
