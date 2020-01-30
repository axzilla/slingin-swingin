import React from 'react'

import Bookmarks from './components/Bookmarks'
import Posts from './components/Posts'
import Comments from './components/Comments'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 'calc(100% - 240px)'
  },
  appBar: {
    marginBottom: '20px'
  }
})

function TabsPost() {
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
          <Tab label="Posts" />
          <Tab label="Bookmarks" />
          <Tab label="Comments" />
        </Tabs>
      </AppBar>
      {value === 0 && <Posts />}
      {value === 1 && <Bookmarks />}
      {value === 2 && <Comments />}
    </div>
  )
}

export default TabsPost
