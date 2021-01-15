// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// Local Components
import { ReviewFeedItem } from './components'

// MUI
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

function ReviewFeed({ placeReviews }) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const itemLimit = 4

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container spacing={2}>
        {placeReviews
          .slice(0, itemLimit)
          .filter(review => review.text)
          .map((review, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <ReviewFeedItem review={review} />
              </Grid>
            )
          })}
      </Grid>

      {placeReviews.length > itemLimit && (
        <Button variant="outlined" size="large" onClick={handleClickOpen}>
          Show all 43 Reviews
        </Button>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Grid container spacing={2}>
            {placeReviews
              .filter(review => review.text)
              .map((review, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <ReviewFeedItem review={review} />
                  </Grid>
                )
              })}
          </Grid>{' '}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

ReviewFeed.propTypes = {
  placeReviews: PropTypes.array.isRequired
}

export default ReviewFeed
