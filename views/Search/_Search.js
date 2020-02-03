import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Tabs from './components/Tabs'

import Spinner from '@components/Spinner'
import isEmpty from '@utils/isEmpty'
import { searchFunc } from '@services/search'

import Grid from '@material-ui/core/Grid'

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
        <Tabs
          searchResult={searchResult}
          searchString={searchString}
          setSearchResult={setSearchResult}
        />
      </React.Fragment>
    )
  }

  return <Grid container>{content}</Grid>
}

export default Search
