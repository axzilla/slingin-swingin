// Packages
import React, { useState } from 'react'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Tab, Tabs, Typography, Grid } from '@material-ui/core'

// Features
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

const CenteredTabs = props => {
  const classes = useStyles()
  const { profile, commentsByUserId } = props

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
        <Tab label={`Beiträge ${props.postsByUserId ? props.postsByUserId.length : '0'}`} />

        <Tab label={`Kommentare ${props.commentsByUserId ? props.commentsByUserId.length : '0'}`} />

        <Tab
          label={`Abonnenten  ${
            props.profilesByFollowerId ? props.profilesByFollowerId.length : '0'
          }`}
        />

        <Tab
          label={`Abonniert ${
            props.profilesByFollowingId ? props.profilesByFollowingId.length : '0'
          }`}
        />
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

export default CenteredTabs
