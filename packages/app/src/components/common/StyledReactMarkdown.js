import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from '../common/CodeBlock'
import ReactMarkdown from 'react-markdown'
import { Typography } from '@material-ui/core'
import Link from '../../components/Link'

function StyledReactMarkdown({ source, escapeHtml, type }) {
  return (
    <Typography>
      <ReactMarkdown
        source={source}
        escapeHtml={escapeHtml}
        renderers={{ code: CodeBlock, link: Link }}
        type={type || 'read'}
      />
    </Typography>
  )
}

StyledReactMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
  escapeHtml: PropTypes.bool.isRequired,
  type: PropTypes.string
}

export default StyledReactMarkdown
