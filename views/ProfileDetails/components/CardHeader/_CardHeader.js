import React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Name, Username, Socials, Bio, Infos, ButtonEdit } from '../'

import { makeStyles } from '@material-ui/styles'
import grey from '@material-ui/core/colors/grey'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({
  cardHeader: {
    border: `3px solid ${grey[500]}`,
    boxShadow: `5px 6px 0px ${grey[400]}`,
    minWidth: '100%'
  }
})

function ProfileDetailsCardHeader({ profile, auth }) {
  const classes = useStyles()

  return (
    <Card className={classes.cardHeader}>
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Grid container alignItems="center" direction="column">
              <Avatar profile={profile} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container>
              <Grid item xs={12}>
                <Name profile={profile} />
                <Username profile={profile} />
                <Bio profile={profile} />
                <Socials profile={profile} />
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
  profile: PropTypes.object,
  auth: PropTypes.object
}

export default ProfileDetailsCardHeader
