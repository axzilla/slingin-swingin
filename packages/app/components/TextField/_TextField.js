import React from 'react'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MuiTextField from '@material-ui/core/TextField'

function TextField({
  type,
  value,
  name,
  onChange,
  onKeyDown,
  placeholder,
  error,
  multiline,
  label,
  rowsMax,
  rows
}) {
  return (
    <FormControl fullWidth error>
      <MuiTextField
        type={type || 'text'}
        variant="outlined"
        label={label}
        error={error ? true : false}
        name={name}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        multiline={multiline}
        rowsMax={rowsMax}
        rows={rows}
        placeholder={placeholder}
        fullWidth
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

TextField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  rowsMax: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string
}

export default TextField
