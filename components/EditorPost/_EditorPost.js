import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
const Editor = dynamic(() => import('draft-js').then(mod => mod.Editor), { ssr: false })

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
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

function EditorPost({ content, setContent, placeholder }) {
  const classes = useStyles()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))))
    }
  }, [])

  function onChange(editorState) {
    setEditorState(editorState)
    setContent(convertToRaw(editorState.getCurrentContent()))
  }

  return (
    <div className={classes.wrapper}>
      <Editor editorState={editorState} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

EditorPost.propTypes = {
  content: PropTypes.object,
  setContent: PropTypes.func,
  placeholder: PropTypes.string
}

export default EditorPost
