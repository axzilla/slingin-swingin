// Packages
import React, { useState } from 'react'

// Features
import SearchPostFeed from './SearchPostFeed'
import SearchProfileFeed from './SearchProfileFeed'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Tab, Tabs, Typography, Grid } from '@material-ui/core'

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  )
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
    width: '100%'
  }
})

const CenteredTabs = props => {
  const classes = useStyles()
  const { posts, profiles, searchString } = props

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
        <Tab label={`Beiträge ${posts ? posts.length : '0'}`} />
        <Tab label={`Mitglieder  ${profiles ? profiles.length : '0'}`} />
      </Tabs>
      {value === 0 && (
        <TabContainer>
          <SearchPostFeed posts={posts} searchString={searchString} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <SearchProfileFeed profiles={profiles} searchString={searchString} />
        </TabContainer>
      )}
    </Grid>
  )
}

export default CenteredTabs
