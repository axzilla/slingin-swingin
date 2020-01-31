import React from 'react'

import Bookmarks from './components/Bookmarks'
import Posts from './components/Posts'
import Comments from './components/Comments'

import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({ tabs: { marginBottom: theme.spacing(3) } }))

function TabsPost() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          className={classes.tabs}
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
      </Paper>
      {value === 0 && <Posts />}
      {value === 1 && <Bookmarks />}
      {value === 2 && <Comments />}
    </div>
  )
}

export default TabsPost
