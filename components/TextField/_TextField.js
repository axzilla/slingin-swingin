import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import MuiTextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  formControl: { width: '100%' },
  error: { lineHeight: '20px', margin: '0' }
})

function TextField({ type, value, name, onChange, label, error }) {
  const classes = useStyles()
  console.log(error)
  return (
    <FormControl className={classes.formControl} error>
      <MuiTextField
        type={type || 'text'}
        margin="dense"
        variant="outlined"
        error={error}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
      />
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </FormControl>
  )
}

TextField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.bool
}

export default TextField
