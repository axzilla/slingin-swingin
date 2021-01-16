// Packages
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import DateRangeIcon from '@material-ui/icons/DateRange'

// Utils
import PlaceUtils from '@utils/placeUtils'

const useStyles = makeStyles(theme => ({
  ratingItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(10)
    }
  }
}))

function Costs({ placeReviews, costs }) {
  const classes = useStyles()
  const placeUtils = new PlaceUtils(placeReviews)

  return (
    <>
      <Box mb={4}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <FastfoodIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h6">Food Costs</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {costs
            .filter(cost => cost.type === 'food')
            .map((cost, index) => {
              return (
                <Grid key={index} item xs={12} sm={6}>
                  <Box className={classes.ratingItem}>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs>
                        <Typography display="inline">{cost.label}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          <Box display="inline">$</Box>
                          <Box fontWeight="bold" display="inline">
                            {placeUtils.getCostSummaries(cost.name).average.toFixed(2)}
                          </Box>{' '}
                          ({placeUtils.getCostSummaries(cost.name).count})
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )
            })}
        </Grid>
      </Box>

      <Box mb={4}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <DateRangeIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h6">Monthly Costs</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {costs
            .filter(cost => cost.type === 'monthly')
            .map((cost, index) => {
              return (
                <Grid key={index} item xs={12} sm={6}>
                  <Box className={classes.ratingItem}>
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item xs>
                        <Typography display="inline">{cost.label}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          <Box display="inline">$</Box>
                          <Box fontWeight="bold" display="inline">
                            {placeUtils.getCostSummaries(cost.name).average.toFixed(1)}
                          </Box>{' '}
                          ({placeUtils.getCostSummaries(cost.name).count})
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    </>
  )
}

Costs.propTypes = {
  placeReviews: PropTypes.array.isRequired,
  costs: PropTypes.array.isRequired
}

export default Costs
