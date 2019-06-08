// Packages
import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import qs from 'query-string'

// Features
import Spinner from '../common/Spinner'
import SearchTabs from './SearchTabs'

// Utils
import isEmpty from '../../utils/isEmpty'

// Actions
import { searchFunc } from '../search/_'

// Material Core
import { Grid } from '@material-ui/core'

const Posts = props => {
  const { searchResult } = props

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    const values = qs.parse(props.location.search)
    const searchString = values.q
    props.searchFunc(searchString)
  }, [])

  let content

  if (isEmpty(props.searchResult)) {
    content = <Spinner />
  } else {
    const values = qs.parse(props.location.search)
    const searchString = values.q
    content = (
      <React.Fragment>
        <SearchTabs
          posts={searchResult.posts}
          profiles={searchResult.profiles}
          searchString={searchString}
        />
      </React.Fragment>
    )
  }

  return <Grid container>{content}</Grid>
}

export default Posts
