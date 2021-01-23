// Packages
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Local Components
import { ForgotPassword, SignIn, SignUp, SignUpFinished } from './components'

// Redux
import { setIsAuthModalReducer } from '@slices/authSlice'

// MUI
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

function AuthModal() {
  const dispatch = useDispatch()
  const { isAuthModal } = useSelector(state => state.auth)
  const [type, setType] = useState('SignUp')
  const [errors, setErrors] = useState('')

  const [authData, setAuthData] = useState({
    login: '',
    email: '',
    username: '',
    password: '',
    password2: ''
  })

  function resetAuthData() {
    setAuthData({
      login: '',
      email: '',
      username: '',
      password: '',
      password2: ''
    })
  }

  function resetErrors() {
    setErrors('')
  }

  function handleClose() {
    dispatch(setIsAuthModalReducer(false))

    // anti flitter hack
    setTimeout(() => {
      resetAuthData()
      resetErrors()
      setType('SignUp')
    }, 500)
  }

  return (
    <Dialog maxWidth="xs" fullWidth open={isAuthModal} onClose={handleClose}>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs>
            {type === 'ForgotPassword' && 'Forgot your password?'}
            {type === 'SignIn' && 'Welcome back – sign in!'}
            {type === 'SignUp' && 'Join now – it’s free!'}
            {type === 'SignUpFinished' && 'Welcome to digitalnomads'}
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        {type === 'ForgotPassword' && (
          <ForgotPassword
            errors={errors}
            setErrors={setErrors}
            authData={authData}
            setAuthData={setAuthData}
            setType={setType}
            handleClose={handleClose}
            resetAuthData={resetAuthData}
            resetErrors={resetErrors}
          />
        )}
        {type === 'SignIn' && (
          <SignIn
            errors={errors}
            setErrors={setErrors}
            authData={authData}
            setAuthData={setAuthData}
            setType={setType}
            handleClose={handleClose}
          />
        )}
        {type === 'SignUp' && (
          <SignUp
            errors={errors}
            setErrors={setErrors}
            resetErrors={resetErrors}
            authData={authData}
            setAuthData={setAuthData}
            setType={setType}
          />
        )}
        {type === 'SignUpFinished' && <SignUpFinished authData={authData} />}
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
