// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Local Components
import { RatingItem } from './components'

// MUI
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

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
      if (userReview) {
        handleUpdatePlaceReview()
      } else {
        handleCreatePlaceReview()
      }

      setOpen(false)
    } catch (error) {
      if (error) throw error
    }
  }

  function isDisabled() {
    return (
      !placeReview.summary &&
      Object.values(placeReview)
        .filter(item => typeof item === 'number')
        .every(item => item === 0)
    )
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
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {userReview ? 'Edit' : 'Write'} Review for {baseData.mapBox.place_name}
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              name="summary"
              fullWidth
              variant="outlined"
              value={placeReview.summary}
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
          </Grid>
        </DialogContent>
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
