// Packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

// Services
import { placeCreate } from '@services/place'

// Utils
import PlaceUtils from '@utils/placeUtils'

// Global Components
import Link from '@components/Link'

// MUI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import AddIcon from '@material-ui/icons/Add'
import Pagination from '@material-ui/lab/Pagination'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import StarRateIcon from '@material-ui/icons/StarRate'
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

function PlaceFeed({ places }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [limit] = useState(20)
  const [searchText, setSearchText] = useState(router.query.searchText || '')
  const [location, setLocation] = useState(null)
  const [locations, setLocations] = useState([])
  const { isAuthenticated } = useSelector(state => state.auth)

  function handlePaginationChange(page) {
    const { query } = router
    router.push({ pathname: '/places', query: { ...query, page, limit } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearchSubmit(e) {
    if (e.keyCode === 13) {
      if (searchText) {
        router.push({ pathname: '/places', query: { searchText, limit, page: 1 } })
      } else {
        router.push({ pathname: '/places', query: { limit, page: 1 } })
      }
    }
  }

  function handleSearchTextChange(e) {
    setSearchText(e.target.value)
  }

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    setLocation(null)
    setError('')
  }

  async function handleGetPlaces(event) {
    try {
      if (event && event.target && event.target.value && event.target.value.length > 3) {
        const searchTerm = event.target.value
        const basePath = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        const types = 'region,place,locality'
        const { data } = await axios.get(
          `${basePath}/${searchTerm}.json?types=${types}&access_token=${token}`
        )

        setLocations(data.features)
      }
    } catch (error) {
      if (error) throw error
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      setError('')
      setIsLoading(true)
      const { data } = await placeCreate({ location })
      handleClose()
      router.push(`/place/${data.shortId}/${data.urlSlug}`)
      setIsLoading(false)
    } catch (error) {
      if (error) {
        setIsLoading(false)
        setError(error.response.data)
      }
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        {/* Search */}
        <Grid item xs={12}>
          <Grid container justify="space-between" alignItems="center">
            <TextField
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={handleSearchSubmit}
              margin="dense"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            {isAuthenticated && (
              <IconButton onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        {/* Search END */}

        {/* Feed */}
        {places.result.map(place => {
          const placeUtils = new PlaceUtils(place.placeReviews)
          function hasReviews() {
            const number = 5
            const random = Math.floor(Math.random() * number)
            return random > 1
          }

          return (
            <Grid key={place._id} item xs={6} md={3}>
              <Link
                href="/place/[shortId]/[urlSlug]"
                as={`/place/${place.shortId}/${place.urlSlug}`}
              >
                <Box mb={2}>
                  <Card>
                    <CardMedia image={place.photo.secure_url}>
                      <Box height={200} />
                      {/* <Grid container justify="flex-end">
                      <IconButton onClick={() => false}>
                        <FavoriteBorderIcon htmlColor="white" />
                      </IconButton>
                    </Grid> */}
                    </CardMedia>
                  </Card>
                </Box>
                <Grid container alignItems="center">
                  {placeUtils.getPlaceRatingSummaries().count > 0 ? (
                    <>
                      <StarRateIcon color="secondary" />
                      <Typography display="inline" variant="body2">
                        {placeUtils.getPlaceRatingSummaries().average}
                      </Typography>
                      &nbsp;
                      <Typography display="inline" color="textSecondary" variant="body2">
                        ({placeUtils.getPlaceRatingSummaries().count})
                      </Typography>
                    </>
                  ) : (
                    <Typography display="inline" color="textSecondary" variant="body2">
                      No reviews yet
                    </Typography>
                  )}
                </Grid>
                <Typography variant="subtitle1" component="h2">
                  <Box
                    fontWeight="bold"
                    whiteSpace="noWrap"
                    overflow="hidden"
                    flex={1}
                    textOverflow="ellipsis"
                  >
                    {place.mapBox.place_name}
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
              </Link>
            </Grid>
          )
        })}
        {/* Feed END*/}

        {/* Pagination */}
        <Grid item xs={12}>
          <Box my={5}>
            <Grid container alignItems="center" justify="center">
              <Pagination
                page={places.page}
                size="large"
                count={places.pages}
                onChange={(e, page) => handlePaginationChange(page)}
              />
            </Grid>
          </Box>
          <Box>
            <Typography component="h3" variant="subtitle1" align="center">
              {places.from} – {places.to} of {places.total} places for digital nomads
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {/* Pagination END*/}

      {/* Dialog */}
      <Dialog disableBackdropClick maxWidth="sm" fullWidth onClose={handleClose} open={open}>
        <DialogTitle>Where’s your place located?</DialogTitle>
        <DialogContent>
          <FormControl fullWidth error>
            <Autocomplete
              freeSolo
              onInputChange={_.debounce(handleGetPlaces, 1000)}
              options={locations}
              onChange={(_, location) => {
                setLocation(location)
                setError('')
              }}
              getOptionLabel={option => option.place_name}
              renderInput={params => (
                <TextField
                  error={error ? true : false}
                  autoFocus
                  {...params}
                  color="secondary"
                  variant="outlined"
                />
              )}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={!location || isLoading}
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
        {isLoading && <LinearProgress color="secondary" />}
      </Dialog>
      {/* Dialog END*/}
    </>
  )
}

PlaceFeed.propTypes = {
  places: PropTypes.object.isRequired
}

export default PlaceFeed
