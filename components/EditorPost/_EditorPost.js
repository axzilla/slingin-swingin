import React from 'react'
import dynamic from 'next/dynamic'
import { EditorState } from 'draft-js'
const Editor = dynamic(() => import('draft-js').then(mod => mod.Editor))

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

function EditorPost() {
  const classes = useStyles()
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())

  return (
    <div className={classes.wrapper}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Write your story or question"
      />
    </div>
  )
}

export default EditorPost
