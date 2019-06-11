import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../utils/isEmpty'
import Avatar from './ProfileDetailsAvatar'
import ProfileDetailsName from './ProfileDetailsName'
import ProfileDetailsUsername from './ProfileDetailsUsername'
import ProfileDetailsSocials from './ProfileDetailsSocials'
import ProfileDetailsBio from './ProfileDetailsBio'
import ProfileDetailsInfos from './ProfileDetailsInfos'
import ProfileDetailsButtonEdit from './ProfileDetailsButtonEdit'
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
          <Grid container item sm={2} alignItems="center" direction="column">
            <Avatar profile={profile} rgbaColor={rgbaColor} />
          </Grid>
          <Grid container item sm={10}>
            <Grid item xs={12}>
              <ProfileDetailsName profile={profile} rgbaColor={rgbaColor} />
              <ProfileDetailsUsername profile={profile} rgbaColor={rgbaColor} />
              <ProfileDetailsBio profile={profile} />
              <ProfileDetailsSocials profile={profile} rgbaColor={rgbaColor} />
              <ProfileDetailsInfos profile={profile} />
              <ProfileDetailsButtonEdit profile={profile} auth={auth} />
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
