// Packages
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

// Local Components
import { ForgotPassword, ResetPassword, SignIn, SignUp, SignUpFinished } from './components'

// Redux
import { signInReducer, authModalReducer } from '@slices/authSlice'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { signUp, signIn, passwordForgot, passwordReset } from '@services/auth'

// MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

function AuthModal() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { setAlert } = useAlert()
  const { authModal } = useSelector(state => state.auth)
  const [errors, setErrors] = useState({ email: '', name: '', password: '', password2: '' })
  const [authData, setAuthData] = useState({ email: '', name: '', password: '', password2: '' })

  function resetAuthData() {
    setAuthData({ email: '', name: '', password: '', password2: '' })
  }

  function resetErrors() {
    setErrors({ email: '', name: '', password: '', password2: '' })
  }

  function handleClose() {
    dispatch(authModalReducer({ isOpen: false, type: null }))

    // anti flitter hack
    setTimeout(() => {
      resetAuthData()
      resetErrors()
    }, 500)
  }

  function handleChange(event) {
    setAuthData({ ...authData, [event.target.name]: event.target.value })
  }

  async function handleSignUp(event) {
    try {
      event.preventDefault()
      const { email, name, password } = authData
      const signedUpUser = await signUp({ email, name, password })
      resetAuthData()
      setAuthData({ ...authData, email: signedUpUser.data.email })
      handleSetType('SignUpFinished')
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  async function handleSignIn(event) {
    try {
      event.preventDefault()
      const { email, password } = authData
      // socket.close() // Close User Socket
      const signedInUser = await signIn({ email, password })
      const jwtToken = signedInUser.data
      const decodedUser = jwtDecode(jwtToken)

      if (decodedUser.isActive) {
        dispatch(signInReducer(jwtToken))
        // socket.open() // Open Guest Socket
        handleClose()
      } else {
        resetAuthData()
        setAuthData({ ...authData, email: decodedUser.email })
        handleSetType('SignUpFinished')
      }
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  async function handleForgotPassword(event) {
    try {
      event.preventDefault()
      const { email } = authData
      await passwordForgot({ email })
      setAlert({
        message: `A link to reset your password has been sent to ${email}.`,
        variant: 'success'
      })
      handleClose()
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  async function handleResetPassword(event) {
    try {
      event.preventDefault()
      const { password, password2 } = authData
      const { resetPasswordToken } = router.query
      const passwordData = { resetPasswordToken, password, password2 }

      const user = await passwordReset(passwordData)
      const jwtToken = user.data
      const decodedUser = jwtDecode(jwtToken)

      if (decodedUser.isActive) {
        dispatch(signInReducer(jwtToken))
        setAlert({
          message: `Welcome back, ${decodedUser.name}! Your password has been updated.`,
          variant: 'success'
        })
        handleClose()
      } else {
        resetAuthData()
        setAuthData({ ...authData, email: decodedUser.email })
        handleSetType('SignUpFinished')
      }
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  function handleSetType(type) {
    if (type !== 'SignUpFinished') {
      resetErrors()
      resetAuthData()
    }

    dispatch(authModalReducer({ ...authModal, type }))
  }

  return (
    authModal.isOpen && (
      <Dialog maxWidth="xs" fullWidth open={authModal.isOpen} onClose={handleClose}>
        <DialogTitle>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              {authModal.type === 'ForgotPassword' && 'Forgot password?'}
              {authModal.type === 'ResetPassword' && 'Reset password'}
              {authModal.type === 'SignIn' && 'Log in'}
              {authModal.type === 'SignUp' && 'Sign up'}
              {authModal.type === 'SignUpFinished' && 'Almost there!'}
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={() =>
                  authModal.type === 'ForgotPassword' ? handleSetType('SignIn') : handleClose()
                }
              >
                {authModal.type === 'ForgotPassword' ? <ArrowBackIcon /> : <CloseIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Box mb={2}>
          <Divider />
        </Box>
        <DialogContent>
          {authModal.type === 'ForgotPassword' && (
            <ForgotPassword
              handleForgotPassword={handleForgotPassword}
              handleChange={handleChange}
              errors={errors}
              authData={authData}
            />
          )}

          {authModal.type === 'ResetPassword' && (
            <ResetPassword
              handleResetPassword={handleResetPassword}
              handleChange={handleChange}
              errors={errors}
              authData={authData}
            />
          )}

          {authModal.type === 'SignIn' && (
            <SignIn
              handleSignIn={handleSignIn}
              handleChange={handleChange}
              errors={errors}
              authData={authData}
              handleSetType={handleSetType}
            />
          )}

          {authModal.type === 'SignUp' && (
            <SignUp
              handleSignUp={handleSignUp}
              handleChange={handleChange}
              errors={errors}
              authData={authData}
              handleSetType={handleSetType}
            />
          )}

          {authModal.type === 'SignUpFinished' && <SignUpFinished authData={authData} />}
        </DialogContent>
      </Dialog>
    )
  )
}

export default AuthModal
