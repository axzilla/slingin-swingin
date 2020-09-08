import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'
import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'

import LanguageIcon from '@material-ui/icons/Language'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import YouTubeIcon from '@material-ui/icons/YouTube'
import InstagramIcon from '@material-ui/icons/Instagram'
import CloudIcon from '@material-ui/icons/Cloud'

const useStyles = makeStyles(theme => ({
  socialIcons: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: grey[900]
  }
}))

function ProfileDetailsSocials({ profile }) {
  const classes = useStyles()

  const checkForHttp = string => {
    if (string.includes('http')) {
      return string
    } else {
      return `http://${string}`
    }
  }

  return (
    <Grid container>
      {isEmpty(profile.website) ? null : (
        <Link style={{ color: grey[900] }} variant="MuiLink" href={checkForHttp(profile.website)}>
          <LanguageIcon className={classes.socialIcons} />
        </Link>
      )}
      {isEmpty(profile.twitter) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.twitter)}>
          <TwitterIcon className={classes.socialIcons} />
        </Link>
      )}
      {isEmpty(profile.facebook) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.facebook)}>
          <FacebookIcon className={classes.socialIcons} />
        </Link>
      )}
      {isEmpty(profile.linkedin) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.linkedin)}>
          <LinkedInIcon className={classes.socialIcons} />
        </Link>
      )}
      {isEmpty(profile.youtube) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.youtube)}>
          <YouTubeIcon className={classes.socialIcons} />
        </Link>
      )}
      {isEmpty(profile.instagram) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.instagram)}>
          <InstagramIcon className={classes.socialIcons} />
        </Link>
      )}
      {isEmpty(profile.soundcloud) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.soundcloud)}>
          <CloudIcon className={classes.socialIcons} />
        </Link>
      )}
    </Grid>
  )
}

ProfileDetailsSocials.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsSocials
