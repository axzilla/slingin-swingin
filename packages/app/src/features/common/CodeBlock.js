import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/styles/hljs'

function CodeBlock({ language, value }) {
  return (
    <SyntaxHighlighter language={language} showLineNumbers style={tomorrowNightEighties}>
      {value}
    </SyntaxHighlighter>
  )
}

CodeBlock.defaultProps = {
  language: null
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}

export default CodeBlock
