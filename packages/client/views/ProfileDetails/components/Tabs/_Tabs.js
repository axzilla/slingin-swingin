import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Comments from './components/Comments'
import Posts from './components/Posts'

import { makeStyles } from '@material-ui/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  )
}

const useStyles = makeStyles({})

TabContainer.propTypes = {
  children: PropTypes.object,
  dir: PropTypes.object
}

function ProfileDetailsTabs({ comments, posts }) {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  function handleChange(event, value) {
    setValue(value)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Tabs className={classes.root} value={value} onChange={handleChange} centered>
            <Tab label={`${posts.length} Posts`} />
            <Tab label={`${comments.length} Comments`} />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {value === 0 && (
          <TabContainer>
            <Posts posts={posts} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Comments comments={comments} />
          </TabContainer>
        )}
      </Grid>
    </Grid>
  )
}

ProfileDetailsTabs.propTypes = {
  posts: PropTypes.array,
  comments: PropTypes.array
}

export default ProfileDetailsTabs
