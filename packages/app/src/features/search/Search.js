import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import qs from 'query-string'

import Spinner from '../common/Spinner'
import SearchTabs from './SearchTabs'

import isEmpty from '../../utils/isEmpty'

import { searchFunc } from './_services'

import { Grid } from '@material-ui/core'

const Search = ({ searchResult, location }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
    const values = qs.parse(location.search)
    const searchString = values.q
    searchFunc(searchString)
  }, [])

  let content

  if (isEmpty(searchResult)) {
    content = <Spinner />
  } else {
    const values = qs.parse(location.search)
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

Search.propTypes = {
  searchResult: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}

export default Search
