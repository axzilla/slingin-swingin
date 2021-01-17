// Packages
import PropTypes from 'prop-types'

// Local Components
import { RatingItem } from './components'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function Ratings({ ratings, placeReview, setPlaceReview }) {
  return (
    <Grid container spacing={2}>
      {ratings.map((rating, index) => {
        return (
          <Grid item xs={6} key={index}>
            <Typography variant="button" display="block">
              {rating.label}
            </Typography>
            <RatingItem rating={rating} placeReview={placeReview} setPlaceReview={setPlaceReview} />
          </Grid>
        )
      })}
    </Grid>
  )
}

Ratings.propTypes = {
  ratings: PropTypes.array.isRequired,
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired
}

export default Ratings
