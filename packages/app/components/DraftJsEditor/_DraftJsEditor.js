// Packages
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { EditorBlock, Editor } from 'draft-js'

// Styles
import useStyles from './styles'

// MUI
import Typography from '@material-ui/core/Typography'

function DraftJsEditor({
  readOnly,
  editorState,
  setEditorState,
  placeholder,
  minHeight,
  maxHeight,
  height
}) {
  const editorRef = useRef(null)
  const { isDarkTheme } = useSelector(state => state.theme.isDarkTheme)
  const classes = useStyles({ minHeight, maxHeight, height, isDarkTheme })

  function handleChange(editorState) {
    setEditorState(editorState)
  }

  useEffect(() => {
    editorRef.current.focus()
  }, [])

  function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType()

    if (type === 'unstyled') {
      return {
        component: Custom
      }
    }
  }

  const Custom = props => {
    // https://codesandbox.io/s/3ozykkmy6?file=/index.js:1507-1681
    return (
      <Typography gutterBottom>
        <EditorBlock {...props} />
      </Typography>
    )
  }

  return (
    <div className={!readOnly && classes.wrapper}>
      <Editor
        ref={editorRef}
        stripPastedStyles
        readOnly={readOnly}
        editorState={editorState}
        onChange={handleChange}
        placeholder={placeholder}
        blockRendererFn={myBlockRenderer}
      />
    </div>
  )
}

DraftJsEditor.propTypes = {
  readOnly: PropTypes.bool,
  editorState: PropTypes.object,
  setEditorState: PropTypes.func,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  height: PropTypes.number,
  placeholder: PropTypes.string
}

export default DraftJsEditor
