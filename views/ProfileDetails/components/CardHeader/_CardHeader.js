import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Name, Username, Socials, Bio, Infos, ButtonEdit } from '../'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function ProfileDetailsCardHeader({ profile }) {
  return (
    <Card>
      <CardContent>
        <Grid>
          <Avatar profile={profile} />
          <Username profile={profile} />
          {(profile.firstName || profile.lastName) && <Name profile={profile} />}
          <Socials profile={profile} />
          <Bio profile={profile} />
          <Infos profile={profile} />
        </Grid>
      </CardContent>
    </Card>
  )
}

ProfileDetailsCardHeader.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfileDetailsCardHeader
