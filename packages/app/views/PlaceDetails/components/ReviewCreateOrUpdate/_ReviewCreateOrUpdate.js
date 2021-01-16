// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Local Components
import { RatingItem } from './components'

// MUI
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
//
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

//
function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...'
    case 1:
      return 'What is an ad group anyways?'
    case 2:
      return 'This is the bit I really care about!'
    default:
      return 'Unknown step'
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))
//

function ReviewCreateOrUpdate({
  ratings,
  userReview,
  handleCreatePlaceReview,
  handleUpdatePlaceReview,
  placeReview,
  setPlaceReview,
  baseData
}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function handleChangePlaceReview(event) {
    setPlaceReview({ ...placeReview, [event.target.name]: event.target.value })
  }

  async function handleCreateOrUpdatePlaceReview() {
    try {
      userReview ? handleUpdatePlaceReview() : handleCreatePlaceReview()
      setOpen(false)
    } catch (error) {
      if (error) throw error
    }
  }

  function isDisabled() {
    if (placeReview.text || placeReview.ratings) {
      return !placeReview.text && Object.values(placeReview.ratings).every(item => item === 0)
    }
  }

  //
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const steps = getSteps()

  const isStepOptional = step => {
    return step === 1
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
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

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
  //

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
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {userReview ? 'Edit' : 'Write'} Review for {baseData.mapBox.place_name}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box mb={2}>
            <TextField
              name="text"
              fullWidth
              variant="outlined"
              value={placeReview.text}
              onChange={handleChangePlaceReview}
              multiline
              rows={6}
            />
          </Box>
          <Grid spacing={2} container>
            {ratings.map((rating, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <Typography>{rating.label}</Typography>
                  <RatingItem
                    rating={rating}
                    placeReview={placeReview}
                    setPlaceReview={setPlaceReview}
                    handleChangePlaceReview={handleChangePlaceReview}
                  />
                </Grid>
              )
            })}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                label="Coffe"
                color="primary"
                // placeholder="Coffee & Coffe"
                // value={searchQueries.number}
                // onChange={handleQueryChange}
                // onKeyDown={handleSearchSubmit}
                // margin="dense"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                fullWidth
                label="Coffee & Coffe"
                // placeholder="Coffee & Coffe"
                // style={}
                // value={searchQueries.number}
                // onChange={handleQueryChange}
                // onKeyDown={handleSearchSubmit}
                // margin="dense"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <Button
            disabled={isDisabled()}
            onClick={handleCreateOrUpdatePlaceReview}
            variant="outlined"
            color="secondary"
          >
            {userReview ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
        {/*  */}
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {}
              const labelProps = {}
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/*  */}
      </Dialog>
    </>
  )
}

ReviewCreateOrUpdate.propTypes = {
  ratings: PropTypes.array.isRequired,
  userReview: PropTypes.object,
  handleCreatePlaceReview: PropTypes.func.isRequired,
  handleUpdatePlaceReview: PropTypes.func.isRequired,
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired,
  baseData: PropTypes.object.isRequired
}

export default ReviewCreateOrUpdate
