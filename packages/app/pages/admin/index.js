// Packages
import React, { useState } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

// Services
// import { getAllPlaces } from '@services/place'

// MUI

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Autocomplete from '@material-ui/lab/Autocomplete'

function Admin() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [limit] = useState(20)
  const [searchText, setSearchText] = useState(router.query.searchText || '')
  const [location, setLocation] = useState(null)
  const [locations, setLocations] = useState([])
  const { isAuthenticated } = useSelector(state => state.auth)

  async function handleChange(event) {
    console.log(event.target.value)

    const result = await axios.get(`http://localhost:5000/_admin/places/${event.target.value}`)

    console.log(result.data)
  }

  return (
    <FormControl fullWidth error>
      <Autocomplete
        freeSolo
        // onInputChange={_.debounce(handleGetPlaces, 1000)}
        onInputChange={_.debounce(handleChange, 500)}
        options={locations}
        onChange={(_, location) => {
          setLocation(location)
          setError('')
        }}
        getOptionLabel={option => option.place_name}
        renderInput={params => (
          <TextField
            error={error ? true : false}
            autoFocus
            {...params}
            color="secondary"
            variant="outlined"
          />
        )}
      />
    </FormControl>
  )
}

export default Admin
