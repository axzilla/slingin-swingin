import React from 'react'
import PropTypes from 'prop-types'
import { CodeBlock } from '../'
import ReactMarkdown from 'react-markdown'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'

function StyledReactMarkdown({ source, escapeHtml, type }) {
  function CustomLink(props) {
    return (
      <Link href={props.href} target="_blank">
        {props.children}
      </Link>
    )
  }

  return (
    <Typography>
      <ReactMarkdown
        source={source}
        escapeHtml={escapeHtml}
        renderers={{ code: CodeBlock, link: CustomLink }}
        type={type || 'read'}
      />
    </Typography>
  )
}

StyledReactMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
  escapeHtml: PropTypes.bool.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string
}

export default StyledReactMarkdown
