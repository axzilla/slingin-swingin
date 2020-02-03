import React from 'react'
import PropTypes from 'prop-types'

import isEmpty from '../../../../utils/isEmpty'

import { Avatar, Name, Username, Socials, Bio, Infos, ButtonEdit } from '../'

import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { Grid, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles({
  cardHeader: {
    border: `3px solid ${grey[500]}`,
    boxShadow: `5px 6px 0px ${grey[400]}`,
    minWidth: '100%'
  }
})

function ProfileDetailsCardHeader({ rgbaColor, profile, auth }) {
  const classes = useStyles()

  return (
    <Card
      className={classes.cardHeader}
      style={{
        border: !isEmpty(profile.color) ? `3px solid ${rgbaColor}` : null,
        boxShadow: !isEmpty(profile.color) ? `5px 6px 0px ${rgbaColor}` : null
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Grid container alignItems="center" direction="column">
              <Avatar profile={profile} rgbaColor={rgbaColor} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container>
              <Grid item xs={12}>
                <Name profile={profile} rgbaColor={rgbaColor} />
                <Username profile={profile} rgbaColor={rgbaColor} />
                <Bio profile={profile} />
                <Socials profile={profile} rgbaColor={rgbaColor} />
                <Infos profile={profile} />
                <ButtonEdit profile={profile} auth={auth} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

ProfileDetailsCardHeader.propTypes = {
  rgbaColor: PropTypes.string,
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfileDetailsCardHeader
