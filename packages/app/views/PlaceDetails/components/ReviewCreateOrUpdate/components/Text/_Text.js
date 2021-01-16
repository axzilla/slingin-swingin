// Packages
import PropTypes from 'prop-types'

// MUI
import TextField from '@material-ui/core/TextField'

function Text({ placeReview, handleChangePlaceReview }) {
  return (
    <TextField
      placeholder="Write a review..."
      autoFocus
      name="text"
      fullWidth
      variant="outlined"
      value={placeReview.text}
      onChange={handleChangePlaceReview}
      multiline
      // this overwrites MuiFormControl
      style={{ height: '100%' }}
      // this overwrites MuiInputeBase
      InputProps={{ style: { height: '100%' } }}
      // this overwrites underlaying textarea
      inputProps={{ style: { height: '100%' } }}
    />
  )
}

Text.propTypes = {
  placeReview: PropTypes.object.isRequired,
  handleChangePlaceReview: PropTypes.func.isRequired
}

export default Text
