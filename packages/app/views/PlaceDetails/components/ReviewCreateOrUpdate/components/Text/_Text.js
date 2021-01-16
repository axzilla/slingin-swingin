// Packages
import PropTypes from 'prop-types'

// MUI
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

function Text({ placeReview, setPlaceReview }) {
  return (
    <>
      <Typography gutterBottom variant="button">
        Textreview
      </Typography>
      <TextField
        autoFocus
        name="text"
        fullWidth
        variant="outlined"
        value={placeReview.text}
        onChange={event => setPlaceReview({ ...placeReview, text: event.target.value })}
        multiline
        // this overwrites MuiFormControl
        style={{ height: 'calc(100% - 16.5px)' }}
        // this overwrites MuiInputeBase
        InputProps={{ style: { height: 'calc(100% - 16.5px)' } }}
        // this overwrites underlaying textarea
        inputProps={{ style: { height: 'calc(100% - 16.5px)' } }}
      />
    </>
  )
}

Text.propTypes = {
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired
}

export default Text
