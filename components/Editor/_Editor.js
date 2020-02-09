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
  quill: {
    '& .ql-editor': { fontFamily: 'Roboto', minHeight: '200px' },

    '& .ql-blank': { '&:before': { fontStyle: 'normal' } },

    '& .ql-snow .ql-tooltip': {
      position: 'relative !important',
      left: '0 !important',
      top: '0 !important'
    },

    '& .ql-toolbar': {
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px'
    },

    '& .ql-container': {
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px'
    }
  },
  error: { lineHeight: '20px', margin: '0', color: theme.palette.error.dark }
}))

function Editor({ error, ...rest }) {
  const classes = useStyles()
  return (
    <>
      <ReactQuill
        className={classes.quill}
        modules={modules}
        formats={formats}
        theme="snow"
        {...rest}
      />
      {error && <FormHelperText className={classes.error}>{error}</FormHelperText>}
    </>
  )
}

Editor.propTypes = {
  error: PropTypes.string
}

export default Editor
