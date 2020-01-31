import React, { useState, useEffect } from 'react'

import Container from '../../components/Container'
import TextField from '../../components/TextField'
import { useAlert } from '../../contexts/AlertContext'
import { profileUpdate, getCurrentProfile } from '../../services/profile'

import Avatar from './components/Avatar'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

function ProfileEdit() {
  const { setAlert } = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [profile, setProfile] = useState({})
  // const [state, setState] = useState({
  //   name: '',
  //   location: '',
  //   status: '',
  //   bio: '',
  //   website: '',
  //   twitter: '',
  //   facebook: '',
  //   linkedin: '',
  //   xing: '',
  //   youtube: '',
  //   instagram: '',
  //   soundcloud: ''
  // })

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

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     color: profile.color,
  //     name: profile.name,
  //     company: profile.company,
  //     website: profile.website,
  //     location: profile.location,
  //     status: profile.status,
  //     github: profile.github,
  //     gitlab: profile.gitlab,
  //     bitbucket: profile.bitbucket,
  //     bio: profile.bio,

  //     twitter: profile.social && profile.social.twitter,
  //     facebook: profile.social && profile.social.facebook,
  //     linkedin: profile.social && profile.social.linkedin,
  //     xing: profile.social && profile.social.xing,
  //     youtube: profile.social && profile.social.youtube,
  //     instagram: profile.social && profile.social.instagram
  //   })
  // }, [profile])

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const profileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        handle: profile.handle,
        location: profile.location,
        status: profile.status,
        bio: profile.bio,
        website: profile.website,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        xing: profile.xing,
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
    <Container>
      {isLoading ? (
        '...Loading'
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar />
            </Grid>
            <Grid item xs={12} md={8}>
              <Card>
                <form onSubmit={onSubmit}>
                  <CardHeader subheader="The information can be edited" title="Profile" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="First name"
                          label="First name"
                          name="firstName"
                          value={profile.firstName}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="Last name"
                          label="Last name"
                          name="lastName"
                          value={profile.lastName}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="i.e Beat Producer or Audio Engineer"
                          label="Status"
                          name="status"
                          value={profile.status}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.website}
                          placeholder="Website URL"
                          label="Website"
                          name="website"
                          value={profile.website}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          placeholder="Location"
                          label="Location"
                          name="location"
                          value={profile.location}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.twitter}
                          placeholder="Twitter URL"
                          label="Twitter"
                          name="twitter"
                          value={profile.twitter}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.facebook}
                          placeholder="Facebook URL"
                          label="Facebook"
                          name="facebook"
                          value={profile.facebook}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.instagram}
                          placeholder="Instagram URL"
                          label="Instagram"
                          name="instagram"
                          value={profile.instagram}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.linkedin}
                          placeholder="LinkedIn URL"
                          label="LinkedIn"
                          name="linkedin"
                          value={profile.linkedin}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.xing}
                          placeholder="Xing URL"
                          label="Xing"
                          name="xing"
                          value={profile.xing}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.youtube}
                          placeholder="Youtube URL"
                          label="Youtube"
                          name="youtube"
                          value={profile.youtube}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={errors && errors.soundcloud}
                          placeholder="Soundcloud URL"
                          label="Soundcloud"
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
                          label="About you"
                          name="bio"
                          value={profile.bio}
                          onChange={onChange}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
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
    </Container>
  )
}

export default ProfileEdit
