import React from 'react'

import Bookmarks from './components/Bookmarks'
import Posts from './components/Posts'
import Comments from './components/Comments'

import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 'calc(100% - 240px)'
  },
  tabs: {
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
      <Container>
        {value === 0 && <Posts />}
        {value === 1 && <Bookmarks />}
        {value === 2 && <Comments />}
      </Container>
    </div>
  )
}

export default TabsPost
