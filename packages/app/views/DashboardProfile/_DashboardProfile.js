import React, { useState, useEffect } from 'react'

import { useAlert } from '../../contexts/AlertContext'
import { createProfile, getCurrentProfile } from '../../services/profile'

import { ColorPicker, Avatar } from './components'

import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  TextField,
  Button,
  FormHelperText
} from '@material-ui/core'

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  card: {
    maxWidth: '400px'
  },
  error: {
    lineHeight: '20px',
    display: 'inline',
    margin: '0'
  },
  buttonSocial: {
    display: 'block'
  }
})

function ProfileEdit() {
  const { setAlert } = useAlert()
  const classes = useStyles()

  const [errors, setErrors] = useState('')
  const [profile, setProfile] = useState({})
  const [state, setState] = useState({
    displayColorPicker: false,
    color: '',

    displaySocialInputs: true,
    name: '',
    company: '',
    website: '',
    location: '',
    status: '',
    github: '',
    gitlab: '',
    bitbucket: '',
    bio: '',

    twitter: '',
    facebook: '',
    linkedin: '',
    xing: '',
    youtube: '',
    instagram: ''
  })

  useEffect(() => {
    getInitialData()
  }, [])

  async function getInitialData() {
    try {
      const foundCurrentProfile = await getCurrentProfile()
      setProfile(foundCurrentProfile.data)
    } catch (error) {
      if (error) throw error
    }
  }

  useEffect(() => {
    setState({
      ...state,
      color: profile.color,
      name: profile.name,
      company: profile.company,
      website: profile.website,
      location: profile.location,
      status: profile.status,
      github: profile.github,
      gitlab: profile.gitlab,
      bitbucket: profile.bitbucket,
      bio: profile.bio,

      twitter: profile.social && profile.social.twitter,
      facebook: profile.social && profile.social.facebook,
      linkedin: profile.social && profile.social.linkedin,
      xing: profile.social && profile.social.xing,
      youtube: profile.social && profile.social.youtube,
      instagram: profile.social && profile.social.instagram
    })
  }, [profile])

  const { displaySocialInputs, color } = state
  const rgbaColor = `rgba(${color && color.r}, ${color && color.g}, ${color && color.b}, ${color &&
    color.a})`

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const profileData = {
        name: state.name,
        color: state.color,
        handle: state.handle,
        company: state.company,
        website: state.website,
        location: state.location,
        status: state.status,
        github: state.github,
        gitlab: state.gitlab,
        bitbucket: state.bitbucket,
        bio: state.bio,
        twitter: state.twitter,
        facebook: state.facebook,
        linkedin: state.linkedin,
        xing: state.xing,
        youtube: state.youtube,
        instagram: state.instagram
      }

      await createProfile(profileData)
      setAlert({ message: 'Profil erfolgreich geändert' })
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  function onChange(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function handleColorPickerClick() {
    setState({ ...state, displayColorPicker: !state.displayColorPicker })
  }

  function handleColorPickerClose() {
    setState({ ...state, displayColorPicker: false })
  }

  function handleColorPickerChange(color) {
    setState({ ...state, color: color.rgb })
  }

  let socialInputs

  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <FormControl className={classes.formControl} error>
          <TextField
            error={errors && errors.twitter ? true : false}
            type="text"
            placeholder="Twitter URL"
            label="Twitter"
            margin="normal"
            variant="outlined"
            name="twitter"
            value={state.twitter}
            onChange={onChange}
          />
          {errors && errors.twitter ? (
            <FormHelperText className={classes.error}>{errors.twitter}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            error={errors && errors.facebook ? true : false}
            type="text"
            placeholder="Facebook URL"
            label="Facebook"
            margin="normal"
            variant="outlined"
            name="facebook"
            value={state.facebook}
            onChange={onChange}
          />
          {errors && errors.facebook ? (
            <FormHelperText className={classes.error}>{errors.facebook}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            error={errors && errors.instagram ? true : false}
            type="text"
            placeholder="Instagram URL"
            label="Instagram"
            margin="normal"
            variant="outlined"
            name="instagram"
            value={state.instagram}
            onChange={onChange}
          />
          {errors && errors.instagram ? (
            <FormHelperText className={classes.error}>{errors.instagram}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            error={errors && errors.linkedin ? true : false}
            type="text"
            placeholder="LinkedIn URL"
            label="LinkedIn"
            margin="normal"
            variant="outlined"
            name="linkedin"
            value={state.linkedin}
            onChange={onChange}
          />
          {errors && errors.linkedin ? (
            <FormHelperText className={classes.error}>{errors.linkedin}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            error={errors && errors.xing ? true : false}
            type="text"
            placeholder="Xing URL"
            label="Xing"
            margin="normal"
            variant="outlined"
            name="xing"
            value={state.xing}
            onChange={onChange}
          />
          {errors && errors.xing ? (
            <FormHelperText className={classes.error}>{errors.xing}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            error={errors && errors.youtube ? true : false}
            type="text"
            placeholder="Youtube URL"
            label="Youtube"
            margin="normal"
            variant="outlined"
            name="youtube"
            value={state.youtube}
            onChange={onChange}
          />
          {errors && errors.youtube ? (
            <FormHelperText className={classes.error}>{errors.youtube}</FormHelperText>
          ) : null}
        </FormControl>
      </div>
    )
  }

  return (
    <Grid container justify="center">
      <Grid item xs>
        <Card>
          <CardContent>
            <Avatar />
            <form onSubmit={onSubmit}>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="Wie heisst du?"
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  value={state.name}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="z.B Junior Developer"
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  name="status"
                  value={state.status}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="z.B einen Arbeitgeber"
                  label="Firma"
                  margin="normal"
                  variant="outlined"
                  name="company"
                  value={state.company}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  error={errors && errors.website ? true : false}
                  type="text"
                  placeholder="Website URL"
                  label="Website"
                  margin="normal"
                  variant="outlined"
                  name="website"
                  value={state.website}
                  onChange={onChange}
                />
                {errors && errors.website ? (
                  <FormHelperText className={classes.error}>{errors.website}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="Woher kommst du?"
                  label="Ort"
                  margin="normal"
                  variant="outlined"
                  name="location"
                  value={state.location}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="Github Username"
                  label="Github"
                  margin="normal"
                  variant="outlined"
                  name="github"
                  value={state.github}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="Gitlab Username"
                  label="Gitlab"
                  margin="normal"
                  variant="outlined"
                  name="gitlab"
                  value={state.gitlab}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  placeholder="Bitbucket Username"
                  label="Bitbucket"
                  margin="normal"
                  variant="outlined"
                  name="bitbucket"
                  value={state.bitbucket}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  multiline
                  rowsMax="4"
                  placeholder="Schreib etwas über dich!"
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  name="bio"
                  value={state.bio}
                  onChange={onChange}
                />
              </FormControl>
              <Typography>Profilfarbe</Typography>
              <ColorPicker
                rgbaColor={rgbaColor}
                handleColorPickerChange={handleColorPickerChange}
                handleColorPickerClick={handleColorPickerClick}
                handleColorPickerClose={handleColorPickerClose}
                displayColorPicker={state.displayColorPicker}
              />
              {socialInputs}
              <Button type="submit" variant="outlined" color="primary">
                Speichern
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfileEdit
