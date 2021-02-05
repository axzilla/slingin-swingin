// Packages
import React, { useState } from 'react'
import _ from 'lodash'
import axios from 'axios'

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

function Admin() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false) // eslint-disable-line
  const [place, setPlace] = useState(null) // eslint-disable-line
  const [places, setPlaces] = useState([])

  async function handleGetMapboxPlaces(event) {
    try {
      if (event.target.value) {
        setIsLoading(true)
        const foundPlaces = await axios.get(
          `http://localhost:5000/_admin/get-mapbox-places/${event.target.value}`
        )

        await setPlaces(foundPlaces.data)
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
        `http://localhost:5000/_admin/get-place-images/${place.place_name}`
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
      const data = { photo: selectedImage.url, mapBox: place }
      const createdPlace = await axios.post('http://localhost:5000/_admin/create-place', data)
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.digitalnomads.dev'

      alert(`${baseUrl}/place/${createdPlace.data.shortId}/${createdPlace.data.urlSlug}`)
      setIsLoading(false)
    } catch (error) {
      alert(error.response.data)
      setIsLoading(false)
    }
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
                setPlace(place)
                handleGetPlaceImages(place)
                setSelectedImage({})
                setImages([])
              }}
              options={places}
              getOptionLabel={option => option.place_name}
              renderInput={params => (
                <TextField
                  label="Place"
                  {...params}
                  onChange={event => {
                    if (event.target.value.length < 1) {
                      setPlaces([])
                    }
                  }}
                  color="secondary"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" my={2}>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !place || isEmpty(selectedImage)}
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

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {images.map(image => {
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
