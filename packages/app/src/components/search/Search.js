import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import qs from 'query-string'
import Spinner from '../common/Spinner'
import SearchTabs from './SearchTabs'
import isEmpty from '../../utils/isEmpty'
import { searchFunc } from './_services'
import { Grid } from '@material-ui/core'

function Search({ location }) {
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    const values = qs.parse(location.search)
    const searchString = values.q
    searchFunc(searchString).then(res => setSearchResult(res.data))
  }, [])

  useEffect(() => {
    const values = qs.parse(location.search)
    const searchString = values.q
    searchFunc(searchString).then(res => setSearchResult(res.data))
  }, [location.search])

  let content

  if (isEmpty(searchResult)) {
    content = <Spinner />
  } else {
    const values = qs.parse(location.search)
    const searchString = values.q
    content = (
      <React.Fragment>
        <SearchTabs
          searchResult={searchResult}
          searchString={searchString}
          setSearchResult={setSearchResult}
        />
      </React.Fragment>
    )
  }

  return <Grid container>{content}</Grid>
}

Search.propTypes = {
  location: PropTypes.string
}

export default Search
