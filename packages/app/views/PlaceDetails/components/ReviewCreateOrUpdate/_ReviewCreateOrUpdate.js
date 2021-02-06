// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

// Local Components
import { Text, Ratings, Costs } from './components'

// Redux
import { authModalReducer } from '@slices/authSlice'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles({
  dialogPaper: { height: '100%' }
})

function ReviewCreateOrUpdate({
  ratings,
  costs,
  userReview,
  handleCreatePlaceReview,
  handleUpdatePlaceReview,
  placeReview,
  setPlaceReview,
  baseData
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const { isAuthenticated } = useSelector(state => state.auth)

  const steps = getSteps()

  const handleClickOpen = () => {
    if (isAuthenticated) {
      setOpen(true)
    } else {
      dispatch(authModalReducer({ isOpen: true, type: 'SignUp' }))
    }
  }

  const handleClose = () => {
    setOpen(false)

    // design hack because flittering
    setTimeout(() => {
      handleReset()
    }, 100)
  }

  async function handleCreateOrUpdatePlaceReview() {
    try {
      userReview ? await handleUpdatePlaceReview() : await handleCreatePlaceReview()
      handleClose()
    } catch (error) {
      if (error) throw error
    }
  }

  function isDisabled() {
    if (placeReview.text || placeReview.ratings) {
      return (
        (activeStep === 0 && placeReview.text.length < 3) ||
        (activeStep === 1 && Object.values(placeReview.ratings).every(item => item === 0))
      )
    }
  }

  function getSteps() {
    return ['text', 'ratings', 'costs']
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Text placeReview={placeReview} setPlaceReview={setPlaceReview} />
      case 1:
        return (
          <Ratings ratings={ratings} placeReview={placeReview} setPlaceReview={setPlaceReview} />
        )
      case 2:
        return <Costs costs={costs} placeReview={placeReview} setPlaceReview={setPlaceReview} />
    }
  }

  const isStepSkipped = step => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <Box my={2}>
        <Button size="large" variant="outlined" onClick={handleClickOpen}>
          {userReview ? 'Edit' : 'Write'} Review
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Grid container justify="space-between" alignItems="center">
            {userReview ? 'Edit' : 'Write'} Review for {baseData.mapBox.place_name}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>{getStepContent(activeStep)}</DialogContent>
        <Divider />
        <DialogActions>
          <>
            {activeStep === steps.length ? (
              <>
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    disabled={isDisabled()}
                    onClick={handleCreateOrUpdatePlaceReview}
                    variant="contained"
                    color="secondary"
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    disabled={isDisabled()}
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </>
            )}
          </>
        </DialogActions>
      </Dialog>
    </>
  )
}

ReviewCreateOrUpdate.propTypes = {
  ratings: PropTypes.array.isRequired,
  costs: PropTypes.object.isRequired,
  userReview: PropTypes.object,
  handleCreatePlaceReview: PropTypes.func.isRequired,
  handleUpdatePlaceReview: PropTypes.func.isRequired,
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired
}

export default ReviewCreateOrUpdate
