import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'
import isEmpty from '@utils/isEmpty'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import LanguageIcon from '@material-ui/icons/Language'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import YouTubeIcon from '@material-ui/icons/YouTube'
import InstagramIcon from '@material-ui/icons/Instagram'
import CloudIcon from '@material-ui/icons/Cloud'

function ProfileDetailsSocials({ profile }) {
  const checkForHttp = string => {
    if (string.includes('http')) {
      return string
    } else {
      return `http://${string}`
    }
  }

  return (
    <Box mb={2}>
      <Grid container justify="center">
        {isEmpty(profile.website) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.website)}>
            <IconButton>
              <LanguageIcon />
            </IconButton>
          </Link>
        )}
        {isEmpty(profile.twitter) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.twitter)}>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Link>
        )}
        {isEmpty(profile.facebook) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.facebook)}>
            <IconButton>
              <FacebookIcon />
            </IconButton>
          </Link>
        )}
        {isEmpty(profile.linkedin) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.linkedin)}>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Link>
        )}
        {isEmpty(profile.youtube) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.youtube)}>
            <IconButton>
              <YouTubeIcon />
            </IconButton>
          </Link>
        )}
        {isEmpty(profile.instagram) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.instagram)}>
            <IconButton>
              <InstagramIcon />
            </IconButton>
          </Link>
        )}
        {isEmpty(profile.soundcloud) ? null : (
          <Link variant="MuiLink" href={checkForHttp(profile.soundcloud)}>
            <IconButton>
              <CloudIcon />
            </IconButton>
          </Link>
        )}
      </Grid>
    </Box>
  )
}

ProfileDetailsSocials.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsSocials
