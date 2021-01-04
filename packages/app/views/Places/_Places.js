// Packages
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
})

function Places({ places }) {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      {places.map(place => (
        <Grid key={place._id} item xs={6} md={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={place.place_name}
                height="140"
                image={place.photo && place.photo.secure_url}
                title={place.place_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {place.mapBox.place_name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

Places.propTypes = {
  places: PropTypes.array.isRequired
}

export default Places
