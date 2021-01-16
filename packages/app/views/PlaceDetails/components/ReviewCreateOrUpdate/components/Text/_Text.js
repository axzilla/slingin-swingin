// Packages
import PropTypes from 'prop-types'

// MUI
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

function Text({ placeReview, handleChangePlaceReview }) {
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
        onChange={handleChangePlaceReview}
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
  handleChangePlaceReview: PropTypes.func.isRequired
}

export default Text
