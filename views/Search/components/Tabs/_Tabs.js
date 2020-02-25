import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Posts from './components/Posts'
import Profiles from './components/Profiles'

import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node,
  dir: PropTypes.object
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
    width: '100%'
  }
})

function CenteredTabs({ searchResult, searchString, setSearchResult }) {
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
            <Tab label={`Beiträge ${searchResult.posts ? searchResult.posts.length : '0'}`} />
            <Tab
              label={`Mitglieder  ${searchResult.profiles ? searchResult.profiles.length : '0'}`}
            />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {value === 0 && (
          <TabContainer>
            <Posts
              searchResult={searchResult}
              searchString={searchString}
              setSearchResult={setSearchResult}
            />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Profiles searchResult={searchResult} searchString={searchString} />
          </TabContainer>
        )}
      </Grid>
    </Grid>
  )
}

CenteredTabs.propTypes = {
  posts: PropTypes.array,
  profiles: PropTypes.array,
  searchString: PropTypes.string,
  searchResult: PropTypes.object,
  setSearchResult: PropTypes.func
}

export default CenteredTabs
