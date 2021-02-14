// Packages
import React, { useState } from 'react'
import _ from 'lodash'
import axios from 'axios'
import countryList from 'countries-list'

// Utils
import isEmpty from '@utils/isEmpty'

// Global Components
import { Link } from '@components'

// MUI
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'

function Admin() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState({})
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false) // eslint-disable-line
  const [mapboxPlace, setMapboxPlace] = useState(null) // eslint-disable-line
  const [maboxPlaces, setMapboxPlaces] = useState([])
  const [continent, setContinent] = useState('')

  const clientUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://www.digitalnomads.dev'

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  async function handleGetMapboxPlaces(event) {
    try {
      if (event.target.value) {
        setIsLoading(true)
        const foundPlaces = await axios.get(
          `${serverUrl}/_admin/get-mapbox-places/${event.target.value}`
        )

        await setMapboxPlaces(foundPlaces.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error.response.data) // eslint-disable-line
      setIsLoading(false)
      setError(error.response.data)
    }
  }

  async function handleGetPlaceImages(place) {
    try {
      setIsLoading(true)

      const foundImages = await axios.get(
        `${serverUrl}/_admin/get-place-images/${place.place_name}`
      )

      await setImages(foundImages.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error.response.data) // eslint-disable-line
      setIsLoading(false)
      setError(error.response.data)
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true)
      const photo = imageUrl || selectedImage.url
      const mapBox = mapboxPlace
      //
      const longitude = mapboxPlace.center[0]
      const latitude = mapboxPlace.center[1]
      const name = mapboxPlace.text
      const countryCode = mapboxPlace.context
        ? mapboxPlace.context[mapboxPlace.context.length - 1].short_code.toUpperCase()
        : mapboxPlace.properties.short_code.toUpperCase()
      const continentCode = countryList.countries[countryCode].continent
      const continent = countryList.continents[continentCode]
      //
      const country = mapboxPlace.context
        ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'country')[0].text
        : mapboxPlace.text
      const region =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'region')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'region')[0].text
          : null
      const postcode =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'postcode')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'postcode')[0].text
          : null
      const district =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'district')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'district')[0].text
          : null
      const place =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'place')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'place')[0].text
          : null
      const locality =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'locality')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'locality')[0].text
          : null
      const neighborhood =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'neighborhood')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'neighborhood')[0].text
          : null
      const address =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'address')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'address')[0].text
          : null
      const poi =
        mapboxPlace.context &&
        mapboxPlace.context.filter(item => item.id.split('.')[0] === 'poi')[0]
          ? mapboxPlace.context.filter(item => item.id.split('.')[0] === 'poi')[0].text
          : null

      const data = {
        // required
        mapBox,
        longitude,
        latitude,
        name,
        continent,
        continentCode,
        country,
        countryCode,
        //
        region,
        postcode,
        district,
        place,
        locality,
        neighborhood,
        address,
        poi,
        //
        photo
      }

      console.log(data) // eslint-disable-line
      const createdPlace = await axios.post(`${serverUrl}/_admin/create-place`, data)

      alert(`${clientUrl}/place/${createdPlace.data.shortId}/${createdPlace.data.urlSlug}`)
      setIsLoading(false)
    } catch (error) {
      console.log(error) // eslint-disable-line
      alert(error.response.data)
      setIsLoading(false)
    }
  }

  function handleSetContinent(place) {
    const countryCode = place.context
      ? place.context[place.context.length - 1].short_code.toUpperCase()
      : place.properties.short_code.toUpperCase()

    const continentCode = countryList.countries[countryCode].continent
    const continent = countryList.continents[continentCode]
    setContinent(continent)
  }

  return (
    <Box py={5} height="100vh">
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              disabled={isLoading}
              fullWidth
              disableClearable
              freeSolo
              onInputChange={_.debounce(handleGetMapboxPlaces, 1000)}
              onChange={async (event, place) => {
                handleSetContinent(place)
                setMapboxPlace(place)
                handleGetPlaceImages(place)
                setSelectedImage({})
                setImages([])
              }}
              options={maboxPlaces}
              getOptionLabel={option => option.place_name}
              renderInput={params => (
                <TextField
                  label="Place"
                  {...params}
                  onChange={event => {
                    if (event.target.value.length < 1) {
                      setMapboxPlaces([])
                    }
                  }}
                  color="secondary"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {mapboxPlace && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                label="Image URL"
                color="secondary"
                variant="outlined"
              />
            </Grid>
          )}

          <Grid item xs={12}>
            {continent && mapboxPlace && (
              <Typography>
                {continent && continent} {'> '}
                {mapboxPlace &&
                  mapboxPlace.place_name
                    .split(',')
                    .map(item => item.trim())
                    .reverse()
                    .join(' > ')}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" my={2}>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !mapboxPlace || (isEmpty(selectedImage) && !imageUrl)}
                size="large"
                variant="outlined"
                color="secondary"
              >
                Create
              </Button>
            </Box>
          </Grid>

          {isLoading && (
            <Grid item xs={12}>
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            </Grid>
          )}
        </Grid>

        {imageUrl && (
          <Grid item xs={12}>
            <Card>
              <Grid container height="100%">
                <div
                  style={{
                    height: '500px',
                    background: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    width: '100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <CardContent>
                    <Link href={imageUrl} variant="MuiLink">
                      <IconButton size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </CardContent>
                </div>
              </Grid>
            </Card>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {!imageUrl &&
              images.map(image => {
                return (
                  <Grid item xs={3} key={image.url}>
                    <Card>
                      <Grid container height="100%">
                        <div
                          style={{
                            height: '250px',
                            background: `url(${image.url})`,
                            backgroundSize: 'cover',
                            width: '100%',
                            backgroundPosition: 'center'
                          }}
                        >
                          <CardContent>
                            <Link href={image.url} variant="MuiLink">
                              <IconButton size="small">
                                <VisibilityIcon />
                              </IconButton>
                            </Link>
                          </CardContent>
                        </div>
                        <Grid item xs={12}>
                          <CardContent>
                            <Button
                              fullWidth
                              variant={image.url === selectedImage.url ? 'contained' : 'outlined'}
                              onClick={() => setSelectedImage(image)}
                            >
                              {image.url === selectedImage.url ? 'Selected' : 'Select'}
                            </Button>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Admin
