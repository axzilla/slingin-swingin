import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Username, Socials, Bio, Infos } from '../'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function ProfileDetailsCardHeader({ profile }) {
  return (
    <Card>
      <CardContent>
        <Grid>
          <Grid container alignItems="flex-start">
            <Grid item sm={3}>
              <Avatar profile={profile} />
            </Grid>
            <Grid item sm={9}>
              <Username profile={profile} />
              <Infos profile={profile} />
              <Bio profile={profile} />
              <Socials profile={profile} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

ProfileDetailsCardHeader.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsCardHeader
