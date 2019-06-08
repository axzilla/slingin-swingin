import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import { Tab, Tabs, Typography, Grid } from '@material-ui/core'

import ProfileDetailsPostFeed from './ProfileDetailsPostFeed'
import ProfileDetailsFollower from './ProfileDetailsFollower'
import ProfileDetailsFollowing from './ProfileDetailsFollowing'
import ProfileDetailsComments from './ProfileDetailsComments'

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  )
}

const useStyles = makeStyles({
  label: {
    color: '#FFF000'
  },
  indicator: {
    backgroundColor: 'green'
  },
  root: {
    flexGrow: 1,
    marginBottom: '20px',
    width: '100%'
  }
})

TabContainer.propTypes = {
  children: PropTypes.object.isRequired,
  dir: PropTypes.object.isRequired
}

const CenteredTabs = ({
  profile,
  commentsByUserId,
  postsByUserId,
  profilesByFollowerId,
  profilesByFollowingId
}) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <Grid item xs={12}>
      <Tabs
        className={classes.root}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={`Beiträge ${postsByUserId ? postsByUserId.length : '0'}`} />

        <Tab label={`Kommentare ${commentsByUserId ? commentsByUserId.length : '0'}`} />

        <Tab label={`Abonnenten  ${profilesByFollowerId ? profilesByFollowerId.length : '0'}`} />

        <Tab label={`Abonniert ${profilesByFollowingId ? profilesByFollowingId.length : '0'}`} />
      </Tabs>
      {value === 0 && (
        <TabContainer>
          <ProfileDetailsPostFeed profile={profile} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <ProfileDetailsComments commentsByUserId={commentsByUserId} />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <ProfileDetailsFollower userId={profile.user._id} />
        </TabContainer>
      )}
      {value === 3 && (
        <TabContainer>
          <ProfileDetailsFollowing />
        </TabContainer>
      )}
    </Grid>
  )
}

CenteredTabs.propTypes = {
  profile: PropTypes.object.isRequired,
  commentsByUserId: PropTypes.array.isRequired,
  postsByUserId: PropTypes.array.isRequired,
  profilesByFollowerId: PropTypes.array.isRequired,
  profilesByFollowingId: PropTypes.array.isRequired
}

export default CenteredTabs
