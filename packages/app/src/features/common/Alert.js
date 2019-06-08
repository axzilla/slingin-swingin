// Packages
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

// Utils
import isEmpty from '../../utils/isEmpty'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
// import Button from '@material-ui/core/Button'

// Material Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

// Material Color
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function MySnackbarContentWrapper(props) {
  const classes = useStyles()
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

function CustomizedSnackbars(props) {
  useEffect(() => {
    if (!isEmpty(props.alert.message)) {
      setOpen(true)
    }
  }, [props.alert.message])

  const [open, setOpen] = React.useState(false)

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    props.setAlert({ message: null, variant: null })
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={props.alert.variant || 'success'}
          message={props.alert.message}
        />
      </Snackbar>
    </div>
  )
}

CustomizedSnackbars.propTypes = {
  alert: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
}

export default CustomizedSnackbars
