// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CommuteIcon from '@material-ui/icons/Commute'

const useStyles = makeStyles(theme => ({
  ratingItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(10)
    }
  }
}))

function CostsMobilty() {
  const classes = useStyles()

  return (
    <>
      <Box mb={4}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <CommuteIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h6">Mobility Costs</Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={1}>
        {[
          { name: 'Car' },
          { name: 'Scooter / Motorcycle' },
          { name: 'Bus' },
          { name: 'Train' },
          { name: 'Uber' },
          { name: 'Grab' }
        ].map((rating, index) => {
          return (
            <Grid key={index} item xs={12} sm={6}>
              <Box className={classes.ratingItem}>
                <Grid container justify="space-between" alignItems="center" spacing={1}>
                  <Grid item xs>
                    <Typography display="inline">{rating.name}</Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle1">
                      <Box display="inline">$</Box>
                      <Box fontWeight="bold" display="inline">
                        {Math.floor(Math.random() * 10)}
                      </Box>
                    </Typography>
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

export default CostsMobilty
