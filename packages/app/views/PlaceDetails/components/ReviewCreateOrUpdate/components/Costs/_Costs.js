// Packages
import { useState } from 'react'
// import PropTypes from 'prop-types'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

function Costs() {
  const [costs, setCosts] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setCosts({ ...costs, [name]: parseInt(value.replace(/[^0-9]/g, '')) })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="button">Food Costs</Typography>
        </Grid>
        {[
          { name: 'coffee', label: 'Coffee' },
          { name: 'cappuccino', label: 'Cappuccino' },
          { name: 'tea', label: 'Tea' },
          { name: 'beer', label: 'Beer' },
          { name: 'cocktail', label: 'Cocktail' },
          { name: 'lemonade', label: 'Lemonade 0.33l' },
          { name: 'water', label: 'Water 0.33l' },
          { name: 'localFood', label: 'Local Meal' },
          { name: 'restaurant', label: 'Restaurant Meal' }
        ].map(item => {
          return (
            <Grid key={item.label} item xs={6} sm={3}>
              <Typography color="textSecondary">{item.label}</Typography>
              <TextField
                name={item.name}
                fullWidth
                color="primary"
                margin="dense"
                variant="outlined"
                value={costs[item.name] || 0}
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
        {[
          { name: 'hotel', label: 'Hotel' },
          { name: 'airbnb', label: 'Airbnb' },
          { name: 'apartment', label: 'Apartment' },
          { name: 'house', label: 'House' },
          { name: 'villa', label: 'Villa' },
          { name: 'coworking', label: 'Coworking' },
          { name: 'scooter', label: 'Scooter' }
        ].map(item => {
          return (
            <Grid key={item.label} item xs={6} sm={3}>
              <Typography color="textSecondary">{item.label}</Typography>
              <TextField
                name={item.name}
                fullWidth
                color="primary"
                margin="dense"
                variant="outlined"
                value={costs[item.name] || 0}
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

// Costs.propTypes = {}

export default Costs
