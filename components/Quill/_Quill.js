import React from 'react'
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css'

import { makeStyles } from '@material-ui/styles'
import FormHelperText from '@material-ui/core/FormHelperText'

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false

const modules = {
  toolbar: [['bold', 'italic', 'link'], []],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

const useStyles = makeStyles(theme => ({
  error: { lineHeight: '20px', margin: '0', color: theme.palette.error.dark }
}))

function Quill({ error, ...rest }) {
  const classes = useStyles()
  return (
    <>
      <ReactQuill modules={modules} formats={formats} theme="snow" {...rest} />
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </>
  )
}

Quill.propTypes = {
  error: PropTypes.string
}

export default Quill
