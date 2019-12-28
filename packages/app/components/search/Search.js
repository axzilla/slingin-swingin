import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Spinner from '../common/Spinner'
import SearchTabs from './SearchTabs'
import isEmpty from '../../utils/isEmpty'
import { searchFunc } from './_services'
import { Grid } from '@material-ui/core'

function Search() {
  const router = useRouter()
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    getInitialData()
  }, [])

  useEffect(() => {
    getInitialData()
  }, [router.query.q])

  async function getInitialData() {
    try {
      const foundSearchResult = await searchFunc(router.query.q)
      setSearchResult(foundSearchResult.data)
    } catch (error) {
      if (error) throw error
    }
  }

  let content

  if (isEmpty(searchResult)) {
    content = <Spinner />
  } else {
    const searchString = router.query.q
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
