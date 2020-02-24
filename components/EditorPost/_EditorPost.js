import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import createImagePlugin from 'draft-js-image-plugin'
const Editor = dynamic(() => import('draft-js-plugins-editor'), {
  ssr: false
})

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  toolbar: { marginBottom: theme.spacing(1) },
  wrapper: {
    padding: '10.5px 14px',

    borderRadius: '4px',
    border: '1px solid #ccc',

    '&:hover': {
      border: `1px solid ${theme.palette.common.black}`
    },

    '&:focus-within': {
      border: `2px solid ${theme.palette.primary.main}`,
      margin: '-1px'
    },

    '& img': {
      maxWidth: '100%'
    },

    '& .DraftEditor-root': {
      fontSize: '1rem',
      fontFamily: 'Ubuntu',
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '-0.04px'
    },

    '& .public-DraftEditorPlaceholder-inner': {
      color: fade(theme.palette.common.black, 0.37)
    },

    '& .public-DraftEditor-content': { minHeight: '200px' },
    '& .public-DraftEditorPlaceholder-root': { position: 'absolute' }
  },
  error: { lineHeight: '20px', margin: '0', color: theme.palette.error.dark }
}))

function EditorPost({ editorState, setEditorState, placeholder }) {
  const classes = useStyles()

  const imagePlugin = createImagePlugin()
  const plugins = [imagePlugin]

  function onChange(editorState) {
    setEditorState(editorState)
  }

  return (
    <div className={classes.wrapper}>
      <Editor
        plugins={plugins}
        editorState={editorState}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

EditorPost.propTypes = {
  editorState: PropTypes.object,
  setEditorState: PropTypes.func,
  placeholder: PropTypes.string
}

export default EditorPost
