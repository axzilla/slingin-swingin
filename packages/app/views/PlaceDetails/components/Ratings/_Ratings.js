// Packages
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import StarRateIcon from '@material-ui/icons/StarRate'

// Utils
import PlaceUtils from '@utils/placeUtils'

const useStyles = makeStyles(theme => ({
  ratingItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(10)
    }
  }
}))

function Ratings({ placeReviews, ratings }) {
  const classes = useStyles()
  const placeUtils = new PlaceUtils(placeReviews)

  return (
    <>
      <Box mb={4}>
        <Grid container alignItems="center" spacing={2}>
          <StarRateIcon color="secondary" fontSize="large" />
          <Typography variant="h6">
            {placeUtils.getPlaceRatingSummaries().average} (
            {placeUtils.getPlaceRatingSummaries().count} Reviews)
          </Typography>
        </Grid>
      </Box>

      <Grid container spacing={1}>
        {ratings.map((rating, index) => {
          return (
            <Grid key={index} item xs={12} sm={6}>
              <Box className={classes.ratingItem}>
                <Grid container justify="space-between" alignItems="center" spacing={1}>
                  <Grid item xs>
                    <Grid container alignItems="center">
                      <Typography display="inline" noWrap>
                        {rating.label}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <LinearProgress
                          color="secondary"
                          variant="determinate"
                          value={
                            (100 / 5) *
                            placeUtils.getRatingSummaries(rating.name).average.toFixed(1)
                          }
                        />
                      </Grid>

                      <Grid item>
                        <Typography variant="overline">
                          <Box fontWeight="bold" display="inline">
                            {placeUtils.getRatingSummaries(rating.name).average.toFixed(2)}
                          </Box>{' '}
                          ({placeUtils.getRatingSummaries(rating.name).count})
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

Ratings.propTypes = {
  placeReviews: PropTypes.array.isRequired,
  ratings: PropTypes.array.isRequired
}

export default Ratings
