// Packages
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Local Components
import { ForgotPassword, SignIn, SignUp } from './components'

// Redux
import { setIsAuthModalReducer } from '@slices/authSlice'

// MUI
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'

function AuthModal() {
  const dispatch = useDispatch()
  const { isAuthModal } = useSelector(state => state.auth)
  const [type, setType] = useState('SignUp')

  function handleClose() {
    dispatch(setIsAuthModalReducer(false))

    // anti flitter hack
    setTimeout(() => {
      setType('SignUp')
    }, 500)
  }

  return (
    <Dialog maxWidth="xs" fullWidth open={isAuthModal} onClose={handleClose}>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {type === 'ForgotPassword' && 'Forgot your password?'}
            {type === 'SignIn' && 'Welcome back – log in!'}
            {type === 'SignUp' && 'Join now – it’s free!'}
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        {type === 'ForgotPassword' && (
          <ForgotPassword setType={setType} handleClose={handleClose} />
        )}
        {type === 'SignIn' && <SignIn setType={setType} handleClose={handleClose} />}
        {type === 'SignUp' && <SignUp setType={setType} handleClose={handleClose} />}
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
