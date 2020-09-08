import React from 'react'

import Bookmarks from './components/Bookmarks'
import Posts from './components/Posts'
import Comments from './components/Comments'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

function TabsPost() {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="off">
            <Tab label="Posts" />
            <Tab label="Bookmarks" />
            <Tab label="Comments" />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {value === 0 && <Posts />}
        {value === 1 && <Bookmarks />}
        {value === 2 && <Comments />}
      </Grid>
    </Grid>
  )
}

export default TabsPost
