import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { EditorState, RichUtils, convertToRaw, convertFromRaw, AtomicBlockUtils } from 'draft-js'
import createImagePlugin from 'draft-js-image-plugin'
const Editor = dynamic(() => import('draft-js-plugins-editor'), {
  ssr: false
})

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import ImageIcon from '@material-ui/icons/Image'

const useStyles = makeStyles(theme => ({
  toolbar: { marginBottom: theme.spacing(1) },
  wrapperOutter: {
    borderRadius: '4px',
    border: '1px solid #ccc',

    '&:hover': {
      border: `1px solid ${theme.palette.common.black}`
    },

    '&:focus-within': {
      border: `2px solid ${theme.palette.primary.main}`,
      margin: '-1px'
    }
  },
  wrapperInner: {
    padding: '10.5px 14px',

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

const imagePlugin = createImagePlugin()
const plugins = [imagePlugin]

function EditorPost({ content, setContent, placeholder }) {
  const classes = useStyles()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(content)))
    }
  }, [])

  function onChange(editorState) {
    setEditorState(editorState)
    setContent(convertToRaw(editorState.getCurrentContent()))
  }

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  function onUnderlineClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }

  function onBoldClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  function onItalicClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  function onImageClick() {
    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])

    reader.onload = function() {
      const newEditorState = insertImage(editorState, reader.result)
      onChange(newEditorState)
    }

    reader.onerror = function(error) {
      console.log('Error: ', error)
    }
  }

  function insertImage(editorState, base64) {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: base64 })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
  }

  return (
    <>
      <div className={classes.wrapperOutter}>
        <Button onClick={onUnderlineClick}>
          <FormatUnderlinedIcon />
        </Button>
        <Button onClick={onBoldClick}>
          <FormatBoldIcon />
        </Button>
        <Button onClick={onItalicClick}>
          <FormatItalicIcon />
        </Button>

        <input onChange={onImageClick} style={{ display: 'none' }} id="editor-image" type="file" />
        <span className="icons">
          <label htmlFor="editor-image">
            <Button
              component="span"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              <ImageIcon />
            </Button>
          </label>
        </span>

        <Divider />
        <div className={classes.wrapperInner}>
          <Editor
            plugins={plugins}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  )
}

EditorPost.propTypes = {
  content: PropTypes.object,
  setContent: PropTypes.func,
  placeholder: PropTypes.string
}

export default EditorPost
