// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Local Components
import { Text, Ratings, Costs } from './components'

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
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
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
      return !placeReview.text && Object.values(placeReview.ratings).every(item => item === 0)
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

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const steps = getSteps()

  const isStepOptional = step => {
    return step === 0 || step === 1
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

  const handleSkip = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <Box mb={2}>
        <Grid container justify="flex-end">
          <Button size="large" variant="outlined" onClick={handleClickOpen}>
            {userReview ? 'Edit' : 'Write'} Review
          </Button>
        </Grid>
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
          {userReview ? 'Edit' : 'Write'} Review for {baseData.mapBox.place_name}
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
                {isStepOptional(activeStep) && (
                  <Button variant="outlined" color="secondary" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
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
                  <Button variant="contained" color="secondary" onClick={handleNext}>
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
  costs: PropTypes.array.isRequired,
  userReview: PropTypes.object,
  handleCreatePlaceReview: PropTypes.func.isRequired,
  handleUpdatePlaceReview: PropTypes.func.isRequired,
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired
}

export default ReviewCreateOrUpdate
