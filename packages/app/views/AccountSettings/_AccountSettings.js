// Packages
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from 'axios'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { updateUser, getCurrentUser } from '@services/user'

// Utils
import isEmpty from '@utils/isEmpty'

// Local Components
import { Settings } from './components'

// Global Components
import TextField from '@components/TextField'
import Avatar from './components/Avatar'

// MUI
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField as MuiTextField } from '@material-ui/core'

function AccountSettings() {
  const { setAlert } = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [locations, setLocations] = useState([])
  const [user, setUser] = useState({
    name: '',
    handle: '',
    locationFrom: null,
    locationCurrent: null,
    bio: '',
    website: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      setIsLoading(true)
      const user = await getCurrentUser()
      setUser(user.data)
      setIsLoading(false)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()
      const updatedUser = await updateUser(user)
      setUser(updatedUser.data)
      setAlert({ message: 'Profile updated successfully.', variant: 'success' })
      setErrors('')
    } catch (error) {
      setErrors(error.response.data)

      // if something is wrong with create place
      if (error.response.data.other) {
        setAlert({ message: error.response.data.other, variant: 'error' })
      }
    }
  }

  function onChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  async function handleGetPlaces(event) {
    try {
      if (event && event.target.value.length > 3) {
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

  return (
    <>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar />
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item>
                  <Card variant="outlined">
                    <form onSubmit={onSubmit}>
                      <CardHeader title="Personal info" />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Name
                            </Typography>
                            <TextField
                              error={errors && errors.name}
                              name="name"
                              value={user.name}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Website
                            </Typography>
                            <TextField
                              error={errors && errors.website}
                              placeholder="Website URL"
                              name="website"
                              value={user.website}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Twitter
                            </Typography>
                            <TextField
                              error={errors && errors.twitter}
                              placeholder="Twitter URL"
                              name="twitter"
                              value={user.twitter}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Facebook
                            </Typography>
                            <TextField
                              error={errors && errors.facebook}
                              placeholder="Facebook URL"
                              name="facebook"
                              value={user.facebook}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Instagram
                            </Typography>
                            <TextField
                              error={errors && errors.instagram}
                              placeholder="Instagram URL"
                              name="instagram"
                              value={user.instagram}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              LinkedIn
                            </Typography>
                            <TextField
                              error={errors && errors.linkedin}
                              placeholder="LinkedIn URL"
                              name="linkedin"
                              value={user.linkedin}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Youtube
                            </Typography>
                            <TextField
                              error={errors && errors.youtube}
                              placeholder="Youtube URL"
                              name="youtube"
                              value={user.youtube}
                              onChange={onChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              About you
                            </Typography>
                            <TextField
                              inputProps={{ maxLength: 160 }}
                              multiline
                              rows="4"
                              rowsMax="4"
                              name="bio"
                              value={user.bio}
                              onChange={onChange}
                              helperText={`${(user.bio && user.bio.length) || 0} / 160 characters`}
                            />
                            {/* <FormHelperText>Hello</FormHelperText> */}
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Where are you from
                            </Typography>
                            <Autocomplete
                              disableClearable
                              freeSolo
                              value={!isEmpty(user.locationFrom) ? user.locationFrom.mapBox : null}
                              onInputChange={_.debounce(handleGetPlaces, 1000)}
                              onChange={(event, location) => {
                                setUser({
                                  ...user,
                                  locationFrom: { ...user.locationFrom, mapBox: location }
                                })
                              }}
                              options={locations}
                              getOptionLabel={option => option.place_name}
                              renderInput={params => (
                                <MuiTextField
                                  {...params}
                                  onChange={event => {
                                    if (event.target.value.length < 1) {
                                      setUser({ ...user, locationFrom: null })
                                      setLocations([])
                                    }
                                  }}
                                  color="secondary"
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Current location
                            </Typography>
                            <Autocomplete
                              disableClearable
                              freeSolo
                              value={
                                !isEmpty(user.locationCurrent) ? user.locationCurrent.mapBox : null
                              }
                              onInputChange={_.debounce(handleGetPlaces, 1000)}
                              onChange={(event, location) => {
                                setUser({
                                  ...user,
                                  locationCurrent: { ...user.locationCurrent, mapBox: location }
                                })
                              }}
                              options={locations}
                              getOptionLabel={option => option.place_name}
                              renderInput={params => (
                                <MuiTextField
                                  {...params}
                                  onChange={event => {
                                    if (event.target.value.length < 1) {
                                      setUser({ ...user, locationCurrent: null })
                                      setLocations([])
                                    }
                                  }}
                                  color="secondary"
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardContent>
                        <Button type="submit" variant="contained" color="secondary">
                          Save
                        </Button>
                      </CardContent>
                    </form>
                  </Card>
                </Grid>
                <Grid item>
                  <Settings />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default AccountSettings