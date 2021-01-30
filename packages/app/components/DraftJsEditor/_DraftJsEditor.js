import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'

const Editor = dynamic(() => import('draft-js-plugins-editor'), {
  ssr: false
})

import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  toolbar: { marginBottom: theme.spacing(1) },
  wrapper: {
    padding: '18.5px 14px',
    borderRadius: '10px',
    border: ({ isDarkTheme }) =>
      isDarkTheme
        ? `1px solid ${fade(theme.palette.text.primary, 0.23)}`
        : `1px solid ${fade(theme.palette.text.primary, 0.23)}`,

    '&:hover': {
      border: ({ isDarkTheme }) =>
        isDarkTheme
          ? `1px solid ${fade(theme.palette.text.primary, 0.87)}`
          : `1px solid ${fade(theme.palette.text.primary, 0.87)}`
    },

    '&:focus-within': {
      border: `2px solid ${theme.palette.text.primary} !important`,
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
      color: ({ isDarkTheme }) =>
        isDarkTheme
          ? fade(theme.palette.text.primary, 0.3)
          : fade(theme.palette.text.secondary, 0.3)
    },

    '& .public-DraftEditor-content': {
      height: ({ height }) => height,
      minHeight: ({ minHeight }) => minHeight,
      maxHeight: ({ maxHeight }) => maxHeight,
      overflow: 'scroll'
    },
    '& .public-DraftEditorPlaceholder-root': { position: 'absolute' }
  },
  error: { lineHeight: '20px', margin: '0', color: theme.palette.error.dark }
}))

function DraftJsEditor({ editorState, setEditorState, placeholder, minHeight, maxHeight, height }) {
  const { isDarkTheme } = useSelector(state => state.theme.isDarkTheme)
  const classes = useStyles({ minHeight, maxHeight, height, isDarkTheme })

  function onChange(editorState) {
    setEditorState(editorState)
  }

  return (
    <div className={classes.wrapper}>
      <Editor editorState={editorState} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

DraftJsEditor.propTypes = {
  editorState: PropTypes.object,
  setEditorState: PropTypes.func,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  height: PropTypes.number,
  placeholder: PropTypes.string
}

export default DraftJsEditor
