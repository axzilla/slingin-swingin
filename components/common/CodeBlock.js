import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function CodeBlock({ language, value }) {
  return (
    // <SyntaxHighlighter language={language} showLineNumbers style={tomorrowNightEighties}>
    <SyntaxHighlighter language={language} showLineNumbers>
      {value}
    </SyntaxHighlighter>
  )
}

CodeBlock.defaultProps = {
  language: null
}

CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
}

export default CodeBlock
