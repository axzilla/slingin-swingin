import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import { createProfile, getCurrentProfile } from './_services'

import ProfileEditColorPicker from './ProfileEditColorPicker'
import ProfileEditAvatar from './ProfileEditAvatar'

import { makeStyles } from '@material-ui/styles'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Button
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

const ProfileEdit = ({ history }) => {
  const classes = useStyles()
  const [profile, setProfile] = useState({})
  const [errors, setErrors] = useState()
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
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    try {
      getCurrentProfile().then(profile => setProfile(profile))
    } catch (err) {
      setErrors(err.response.data)
    }
  }, [])

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

  const onSubmit = e => {
    e.preventDefault()

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

    createProfile(profileData, history)
  }

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleColorPickerClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker })
  }

  const handleColorPickerClose = () => {
    setState({ ...state, displayColorPicker: false })
  }

  const handleColorPickerChange = color => {
    setState({ ...state, color: color.rgb })
  }

  let socialInputs

  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors.twitter ? true : false}
            placeholder="Twitter URL"
            label="Twitter"
            margin="normal"
            variant="outlined"
            name="twitter"
            value={state.twitter}
            onChange={onChange}
          />
          {errors.twitter ? (
            <FormHelperText className={classes.error}>{errors.twitter}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors.facebook ? true : false}
            placeholder="Facebook URL"
            label="Facebook"
            margin="normal"
            variant="outlined"
            name="facebook"
            value={state.facebook}
            onChange={onChange}
          />
          {errors.facebook ? (
            <FormHelperText className={classes.error}>{errors.facebook}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors.instagram ? true : false}
            placeholder="Instagram URL"
            label="Instagram"
            margin="normal"
            variant="outlined"
            name="instagram"
            value={state.instagram}
            onChange={onChange}
          />
          {errors.instagram ? (
            <FormHelperText className={classes.error}>{errors.instagram}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors.linkedin ? true : false}
            placeholder="LinkedIn URL"
            label="LinkedIn"
            margin="normal"
            variant="outlined"
            name="linkedin"
            value={state.linkedin}
            onChange={onChange}
          />
          {errors.linkedin ? (
            <FormHelperText className={classes.error}>{errors.linkedin}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors.xing ? true : false}
            placeholder="Xing URL"
            label="Xing"
            margin="normal"
            variant="outlined"
            name="xing"
            value={state.xing}
            onChange={onChange}
          />
          {errors.xing ? (
            <FormHelperText className={classes.error}>{errors.xing}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl} error>
          <TextField
            type="text"
            error={errors.youtube ? true : false}
            placeholder="Youtube URL"
            label="Youtube"
            margin="normal"
            variant="outlined"
            name="youtube"
            value={state.youtube}
            onChange={onChange}
          />
          {errors.youtube ? (
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
            <ProfileEditAvatar />
            <form onSubmit={onSubmit}>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.name ? true : false}
                  placeholder="Wie heisst du?"
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  value={state.name}
                  onChange={onChange}
                />
                {errors.name ? (
                  <FormHelperText className={classes.error}>{errors.name}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.status ? true : false}
                  placeholder="z.B Junior Developer"
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  name="status"
                  value={state.status}
                  onChange={onChange}
                />
                {errors.status ? (
                  <FormHelperText className={classes.error}>{errors.status}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.company ? true : false}
                  placeholder="z.B einen Arbeitgeber"
                  label="Firma"
                  margin="normal"
                  variant="outlined"
                  name="company"
                  value={state.company}
                  onChange={onChange}
                />
                {errors.company ? (
                  <FormHelperText className={classes.error}>{errors.company}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.website ? true : false}
                  placeholder="Website URL"
                  label="Website"
                  margin="normal"
                  variant="outlined"
                  name="website"
                  value={state.website}
                  onChange={onChange}
                />
                {errors.website ? (
                  <FormHelperText className={classes.error}>{errors.website}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.location ? true : false}
                  placeholder="Woher kommst du?"
                  label="Ort"
                  margin="normal"
                  variant="outlined"
                  name="location"
                  value={state.location}
                  onChange={onChange}
                />
                {errors.location ? (
                  <FormHelperText className={classes.error}>{errors.location}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.github ? true : false}
                  placeholder="Github Benutzername"
                  label="Github"
                  margin="normal"
                  variant="outlined"
                  name="github"
                  value={state.github}
                  onChange={onChange}
                />
                {errors.github ? (
                  <FormHelperText className={classes.error}>{errors.github}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.gitlab ? true : false}
                  placeholder="Gitlab Benutzername"
                  label="Gitlab"
                  margin="normal"
                  variant="outlined"
                  name="gitlab"
                  value={state.gitlab}
                  onChange={onChange}
                />
                {errors.gitlab ? (
                  <FormHelperText className={classes.error}>{errors.gitlab}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.bitbucket ? true : false}
                  placeholder="Bitbucket Benutzername"
                  label="Bitbucket"
                  margin="normal"
                  variant="outlined"
                  name="bitbucket"
                  value={state.bitbucket}
                  onChange={onChange}
                />
                {errors.bitbucket ? (
                  <FormHelperText className={classes.error}>{errors.bitbucket}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl className={classes.formControl} error>
                <TextField
                  type="text"
                  error={errors.bio ? true : false}
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
                {errors.bio ? (
                  <FormHelperText className={classes.error}>{errors.bio}</FormHelperText>
                ) : null}
              </FormControl>
              <Typography>Profilfarbe</Typography>
              <ProfileEditColorPicker
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

ProfileEdit.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(ProfileEdit)
