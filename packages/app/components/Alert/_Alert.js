import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { useAlert } from '@contexts/AlertContext'
import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const useStyles = makeStyles(theme => ({
  message: { width: '100%' },
  success: {
    backgroundColor: theme.palette.success.main
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  info: {
    backgroundColor: theme.palette.info.main
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  }
}))

function MySnackbarContentWrapper(props) {
  const classes = useStyles()
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      classes={{ message: classes.message }}
      className={clsx(classes[variant], className)}
      message={
        <Grid container spacing={2} justify="space-between" alignItems="center" wrap="nowrap">
          <Grid item>
            <Icon />
          </Grid>
          <Grid item>{message}</Grid>
          <Grid item>
            <IconButton
              size="small"
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      }
      {...other}
    />
  )
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
}

function CustomizedSnackbars() {
  const { alert, setAlert } = useAlert()

  useEffect(() => {
    if (!isEmpty(alert && alert.message)) {
      setOpen(true)
    }
  }, [alert && alert.message])

  const [open, setOpen] = useState(false)

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)

    // flicker hack
    setTimeout(() => {
      setAlert({ message: null, variant: null })
    }, 500)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={(alert && alert.variant) || 'success'}
        message={alert && alert.message}
      />
    </Snackbar>
  )
}

export default CustomizedSnackbars
