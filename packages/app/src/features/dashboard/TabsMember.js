// Packages
import React from 'react'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
import { AppBar, Tabs, Tab } from '@material-ui/core'

// Components
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

const TabsMember = ({ profile }) => {
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
          <Tab
            label={`Abonnenten (${
              profile.profilesByFollowerId
                ? profile.profilesByFollowerId.length
                : 0
            })`}
          />
          <Tab
            label={`Abonniert (${
              profile.profilesByFollowingId
                ? profile.profilesByFollowingId.length
                : 0
            })`}
          />
        </Tabs>
      </AppBar>
      {value === 0 && <TabsMemberFollower profile={profile} />}
      {value === 1 && <TabsMemberFollowing profile={profile} />}
    </div>
  )
}

export default TabsMember