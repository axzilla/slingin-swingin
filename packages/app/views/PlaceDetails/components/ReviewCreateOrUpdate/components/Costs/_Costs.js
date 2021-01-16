// Packages
import PropTypes from 'prop-types'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

function Costs({ costs, placeReview, setPlaceReview }) {
  function handleChange(event) {
    const { name, value } = event.target
    setPlaceReview({
      ...placeReview,
      costs: { ...placeReview.costs, [name]: parseInt(value.replace(/[^0-9]/g, '')) }
    })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="button">Food Costs</Typography>
        </Grid>
        {costs
          .filter(cost => cost.type === 'food')
          .map(item => {
            return (
              <Grid key={item.label} item xs={6} sm={3}>
                <Typography color="textSecondary">{item.label}</Typography>
                <TextField
                  name={item.name}
                  fullWidth
                  color="primary"
                  margin="dense"
                  variant="outlined"
                  value={(placeReview.costs && placeReview.costs[item.name]) || 0}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            )
          })}

        <Grid item xs={12}>
          <Typography variant="button">Monthly Costs</Typography>
        </Grid>
        {costs
          .filter(cost => cost.type === 'monthly')
          .map(item => {
            return (
              <Grid key={item.label} item xs={6} sm={3}>
                <Typography color="textSecondary">{item.label}</Typography>
                <TextField
                  name={item.name}
                  fullWidth
                  color="primary"
                  margin="dense"
                  variant="outlined"
                  value={(placeReview.costs && placeReview.costs[item.name]) || 0}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            )
          })}
      </Grid>
    </>
  )
}

Costs.propTypes = {
  costs: PropTypes.array.isRequired,
  placeReview: PropTypes.object.isRequired,
  setPlaceReview: PropTypes.func.isRequired
}

export default Costs
