import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import { AppBar, Tabs, Tab } from '@material-ui/core'

import TabsMemberFollower from './TabsMemberFollower'
import TabsMemberFollowing from './TabsMemberFollowing'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 'calc(100% - 240px)'
  },
  appBar: {
    marginBottom: '20px'
  }
})

function TabsMember({ profilesByFollowerId, profilesByFollowingId }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="off"
        >
          <Tab label={`Abonnenten (${profilesByFollowerId ? profilesByFollowerId.length : 0})`} />
          <Tab label={`Abonniert (${profilesByFollowingId ? profilesByFollowingId.length : 0})`} />
        </Tabs>
      </AppBar>
      {value === 0 && <TabsMemberFollower profilesByFollowerId={profilesByFollowerId} />}
      {value === 1 && <TabsMemberFollowing profilesByFollowingId={profilesByFollowingId} />}
    </div>
  )
}

TabsMember.propTypes = {
  profilesByFollowerId: PropTypes.array.isRequired,
  profilesByFollowingId: PropTypes.array.isRequired
}

export default TabsMember
