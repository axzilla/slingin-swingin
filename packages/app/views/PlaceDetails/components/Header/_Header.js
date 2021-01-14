// Packages
import PropTypes from 'prop-types'

// Utils
import PlaceUtils from '@utils/placeUtils'

// MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import StarRateIcon from '@material-ui/icons/StarRate'

function Header({ baseData, placeReviews }) {
  const placeUtils = new PlaceUtils(placeReviews)
  function hasReviews() {
    const number = 5
    const random = Math.floor(Math.random() * number)
    return random > 1
  }

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardMedia image={baseData.photo.secure_url}>
            <Box height={400} />
          </CardMedia>
        </Card>
      </Box>

      {placeUtils.getPlaceSummaries().count ? (
        <Grid container alignItems="center">
          <StarRateIcon color="secondary" />
          <Typography display="inline" variant="body2">
            {placeUtils.getPlaceSummaries().average}
          </Typography>
          &nbsp;
          <Typography display="inline" color="textSecondary" variant="body2">
            ({placeUtils.getPlaceSummaries().count})
          </Typography>
        </Grid>
      ) : (
        <Typography display="inline" color="textSecondary" variant="body2">
          No reviews yet
        </Typography>
      )}

      <Typography variant="h5" component="h1">
        <Box
          fontWeight="bold"
          whiteSpace="noWrap"
          overflow="hidden"
          flex={1}
          textOverflow="ellipsis"
        >
          {baseData.mapBox.place_name}
        </Box>
      </Typography>
      <Typography variant="subtitle1">
        {hasReviews() ? (
          <>
            <Box display="inline">${Math.floor(Math.random() * 3000)}</Box>
            <Box display="inline"> / month</Box>
          </>
        ) : (
          <Box display="inline">No costs yet</Box>
        )}
      </Typography>
    </>
  )
}

Header.propTypes = {
  baseData: PropTypes.object.isRequired,
  placeReviews: PropTypes.array.isRequired
}

export default Header
