import React, { useContext } from 'react'

import AuthContext from '@contexts/AuthContext'
import Link from '@components/Link'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

function AuthModal() {
  const { isAuthModal, setIsAuthModal } = useContext(AuthContext)

  const handleClose = () => {
    setIsAuthModal(false)
  }

  return (
    <Dialog
      maxWidth="xs"
      open={isAuthModal || false}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle align="center" id="alert-dialog-title">
        NOT A MEMBER?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" align="center">
          This feature is for registered noize.dev members only. Log in to your account or create an
          account for FREE if you haven`t done so and join the coolest community of music lovers
          that are already on noize.dev!
        </DialogContentText>
        <Box my={2} align="center">
          <Link href="/register">
            <Button onClick={handleClose} variant="contained" color="secondary">
              Get Started
            </Button>
          </Link>
          <Box my={1}>
            <Typography variant="h5" align="center">
              or
            </Typography>
          </Box>
          <Link href="/login">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Log In
            </Button>
          </Link>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
