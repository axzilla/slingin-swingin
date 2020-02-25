import React from 'react'
import PropTypes from 'prop-types'

import Link from '@components/Link'
import isEmpty from '@utils/isEmpty'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
// import IconButton from '@material-ui/core/IconButton'

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
    marginBottom: theme.spacing(2)
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
        <Link variant="MuiLink" href={checkForHttp(profile.website)}>
          {/* <IconButton> */}
          <LanguageIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
      {isEmpty(profile.twitter) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.twitter)}>
          {/* <IconButton> */}
          <TwitterIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
      {isEmpty(profile.facebook) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.facebook)}>
          {/* <IconButton> */}
          <FacebookIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
      {isEmpty(profile.linkedin) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.linkedin)}>
          {/* <IconButton> */}
          <LinkedInIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
      {isEmpty(profile.youtube) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.youtube)}>
          {/* <IconButton> */}
          <YouTubeIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
      {isEmpty(profile.instagram) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.instagram)}>
          {/* <IconButton> */}
          <InstagramIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
      {isEmpty(profile.soundcloud) ? null : (
        <Link variant="MuiLink" href={checkForHttp(profile.soundcloud)}>
          {/* <IconButton> */}
          <CloudIcon className={classes.socialIcons} />
          {/* </IconButton> */}
        </Link>
      )}
    </Grid>
  )
}

ProfileDetailsSocials.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsSocials
