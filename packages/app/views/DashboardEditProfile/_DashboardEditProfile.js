import React, { useState, useEffect } from 'react'

import TextField from '@components/TextField'
import { useAlert } from '@contexts/AlertContext'
import { profileUpdate, getCurrentProfile } from '@services/profile'

import Avatar from './components/Avatar'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

function ProfileEdit() {
  const { setAlert } = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [profile, setProfile] = useState({})

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

      const profileData = {
        name: profile.name,
        handle: profile.handle,
        location: profile.location,
        status: profile.status,
        bio: profile.bio,
        website: profile.website,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
        soundcloud: profile.soundcloud
      }

      const updatedProfile = await profileUpdate(profileData)
      setProfile(updatedProfile.data)
      setAlert({ message: 'Profile updated' })
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  function onChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
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
              <Card variant="outlined">
                <form onSubmit={onSubmit}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="Name"
                          name="name"
                          value={profile.name}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="i.e Beat Producer or Audio Engineer"
                          name="status"
                          value={profile.status}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.website}
                          placeholder="Website URL"
                          name="website"
                          value={profile.website}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="Location"
                          name="location"
                          value={profile.location}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.twitter}
                          placeholder="Twitter URL"
                          name="twitter"
                          value={profile.twitter}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.facebook}
                          placeholder="Facebook URL"
                          name="facebook"
                          value={profile.facebook}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.instagram}
                          placeholder="Instagram URL"
                          name="instagram"
                          value={profile.instagram}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.linkedin}
                          placeholder="LinkedIn URL"
                          name="linkedin"
                          value={profile.linkedin}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.youtube}
                          placeholder="Youtube URL"
                          name="youtube"
                          value={profile.youtube}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.soundcloud}
                          placeholder="Soundcloud URL"
                          name="soundcloud"
                          value={profile.soundcloud}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          multiline
                          rows="4"
                          rowsMax="4"
                          placeholder="About you"
                          name="bio"
                          value={profile.bio}
                          onChange={onChange}
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
          </Grid>
        </>
      )}
    </>
  )
}

export default ProfileEdit
