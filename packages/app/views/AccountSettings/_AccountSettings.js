// Packages
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from 'axios'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { profileUpdate, getCurrentProfile } from '@services/profile'

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
  const [profile, setProfile] = useState({
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
      const foundProfile = await getCurrentProfile()
      setProfile(foundProfile.data)
      setIsLoading(false)
    } catch (error) {
      if (error) throw error
    }
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()
      const updatedProfile = await profileUpdate(profile)
      setProfile(updatedProfile.data)
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
    setProfile({ ...profile, [event.target.name]: event.target.value })
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
                              value={profile.name}
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
                              value={profile.website}
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
                              value={profile.twitter}
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
                              value={profile.facebook}
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
                              value={profile.instagram}
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
                              value={profile.linkedin}
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
                              value={profile.youtube}
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
                              value={profile.bio}
                              onChange={onChange}
                              helperText={`${
                                (profile.bio && profile.bio.length) || 0
                              } / 160 characters`}
                            />
                            {/* <FormHelperText>Hello</FormHelperText> */}
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Typography color="textSecondary" gutterBottom>
                              Where are you from
                            </Typography>
                            <Autocomplete
                              freeSolo
                              value={
                                !isEmpty(profile.locationFrom) ? profile.locationFrom.mapBox : null
                              }
                              onInputChange={_.debounce(handleGetPlaces, 1000)}
                              onChange={(event, location) => {
                                setProfile({
                                  ...profile,
                                  locationFrom: { ...profile.locationFrom, mapBox: location }
                                })
                              }}
                              options={locations}
                              getOptionLabel={option => option.place_name}
                              renderInput={params => (
                                <MuiTextField
                                  {...params}
                                  onChange={event => {
                                    if (event.target.value.length < 1) {
                                      setProfile({ ...profile, locationFrom: null })
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
                              freeSolo
                              value={
                                !isEmpty(profile.locationCurrent)
                                  ? profile.locationCurrent.mapBox
                                  : null
                              }
                              onInputChange={_.debounce(handleGetPlaces, 1000)}
                              onChange={(event, location) => {
                                setProfile({
                                  ...profile,
                                  locationCurrent: { ...profile.locationCurrent, mapBox: location }
                                })
                              }}
                              options={locations}
                              getOptionLabel={option => option.place_name}
                              renderInput={params => (
                                <MuiTextField
                                  {...params}
                                  onChange={event => {
                                    if (event.target.value.length < 1) {
                                      setProfile({ ...profile, locationCurrent: null })
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
