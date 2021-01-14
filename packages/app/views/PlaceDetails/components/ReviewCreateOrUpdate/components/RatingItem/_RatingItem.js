// Packages
import { useState } from 'react'
import PropTypes from 'prop-types'

// MUI
import Grid from '@material-ui/core/Grid'
import Rating from '@material-ui/lab/Rating'

function RatingItem({ rating, placeReview, setPlaceReview }) {
  const [value, setValue] = useState(placeReview[rating.name] || 0)

  return (
    <Grid container alignItems="center">
      <Rating
        name={rating.name}
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setPlaceReview({
            ...placeReview,
            [event.target.name]: parseFloat(newValue || 0)
          })
          setValue(newValue)
        }}
      />
    </Grid>
  )
}

RatingItem.propTypes = {
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired,
  rating: PropTypes.object.isRequired
}

export default RatingItem
