import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Comments from './components/Comments'
import Posts from './components/Posts'

import { makeStyles } from '@material-ui/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

function TabContainer({ children, dir }) {
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
  children: PropTypes.object,
  dir: PropTypes.object
}

function ProfileDetailsTabs({ commentsByUserId, postsByUserId, setPostsByUserId }) {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  function handleChange(event, value) {
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
        <Tab label={`Posts ${postsByUserId.length}`} />
        <Tab label={`Comments ${commentsByUserId.length}`} />
      </Tabs>
      {value === 0 && (
        <TabContainer>
          <Posts postsByUserId={postsByUserId} setPostsByUserId={setPostsByUserId} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Comments commentsByUserId={commentsByUserId} />
        </TabContainer>
      )}
    </Grid>
  )
}

ProfileDetailsTabs.propTypes = {
  postsByUserId: PropTypes.array,
  setPostsByUserId: PropTypes.func,
  commentsByUserId: PropTypes.array
}

export default ProfileDetailsTabs
