import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'
import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import LanguageIcon from '@material-ui/icons/Language'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import YouTubeIcon from '@material-ui/icons/YouTube'
import InstagramIcon from '@material-ui/icons/Instagram'
import CloudIcon from '@material-ui/icons/Cloud'

// eslint-disable-next-line
const useStyles = makeStyles(theme => ({
  socialIcons: {
    // marginRight: theme.spacing(2),
    // marginBottom: theme.spacing(2)
  }
}))

function ProfileDetailsSocials({ user }) {
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
      {isEmpty(user.website) ? null : (
        <Link style={{ color: grey[900] }} variant="MuiLink" href={checkForHttp(user.website)}>
          <IconButton>
            <LanguageIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
      {isEmpty(user.twitter) ? null : (
        <Link variant="MuiLink" href={checkForHttp(user.twitter)}>
          <IconButton>
            <TwitterIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
      {isEmpty(user.facebook) ? null : (
        <Link variant="MuiLink" href={checkForHttp(user.facebook)}>
          <IconButton>
            <FacebookIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
      {isEmpty(user.linkedin) ? null : (
        <Link variant="MuiLink" href={checkForHttp(user.linkedin)}>
          <IconButton>
            <LinkedInIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
      {isEmpty(user.youtube) ? null : (
        <Link variant="MuiLink" href={checkForHttp(user.youtube)}>
          <IconButton>
            <YouTubeIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
      {isEmpty(user.instagram) ? null : (
        <Link variant="MuiLink" href={checkForHttp(user.instagram)}>
          <IconButton>
            <InstagramIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
      {isEmpty(user.soundcloud) ? null : (
        <Link variant="MuiLink" href={checkForHttp(user.soundcloud)}>
          <IconButton>
            <CloudIcon className={classes.socialIcons} />
          </IconButton>
        </Link>
      )}
    </Grid>
  )
}

ProfileDetailsSocials.propTypes = {
  user: PropTypes.object
}

export default ProfileDetailsSocials
