import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Name, Username, Socials, Bio, Infos, ButtonEdit } from '../'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function ProfileDetailsCardHeader({ profile, auth }) {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Avatar profile={profile} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Name profile={profile} />
            <Username profile={profile} />
            <Bio profile={profile} />
            <Infos profile={profile} />
            <ButtonEdit profile={profile} auth={auth} />
          </Grid>
        </Grid>
        <Socials profile={profile} />
      </CardContent>
    </Card>
  )
}

ProfileDetailsCardHeader.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfileDetailsCardHeader
