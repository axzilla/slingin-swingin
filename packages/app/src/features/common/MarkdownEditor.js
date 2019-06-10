import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism'

import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, FormControl, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles({
  cardPreview: {
    background: 'transparent',
    marginBottom: '20px'
  },
  menu: { marginBottom: '10px' },
  button: { height: '40px', borderRadius: 0 }
})

function CodeBlock({ language, value }) {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {value}
    </SyntaxHighlighter>
  )
}

CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
}

CodeBlock.defaultProps = {
  language: null
}

function MarkdownEditor({ withPreview, setText, onChange, value, name, label, rows }) {
  const classes = useStyles()

  const mdStrings = {
    bold: '**BOLD**',
    italic: '*ITALIC*',
    code: '  \n```\nCODE \n```',
    ul: '- UL',
    ol: '1. ',
    link: '[codehustla.io](http://www.codehustla.io)',
    quote: '> Zitat',
    img: '![Image](https://source.unsplash.com/random/100x100)'
  }

  function onCodeClick() {
    setText(value + mdStrings.code)
  }

  function onBoldClick() {
    setText(value + mdStrings.bold)
  }

  function onItalicClick() {
    setText(value + mdStrings.italic)
  }

  function onUlClick() {
    setText(value + mdStrings.ul)
  }

  function onOlClick() {
    setText(value + mdStrings.ol)
  }

  function onLinkClick() {
    setText(value + mdStrings.link)
  }

  function onQuoteClick() {
    setText(value + mdStrings.quote)
  }

  function onImgClick() {
    setText(value + mdStrings.img)
  }

  return (
    <>
      <FormControl fullWidth error>
        <TextField
          label={label}
          margin="normal"
          multiline
          variant="outlined"
          value={value}
          onChange={onChange}
          name={name}
          rows={rows}
        />

        <Card className={classes.menu}>
          <Button className={classes.button} onClick={onBoldClick}>
            <i className="fas fa-bold fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onItalicClick}>
            <i className="fas fa-italic fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onCodeClick}>
            <i className="fas fa-code fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onUlClick}>
            <i className="fas fa-list-ul fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onOlClick}>
            <i className="fas fa-list-ol fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onLinkClick}>
            <i className="fas fa-link fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onQuoteClick}>
            <i className="fas fa-quote-right fa-lg" />
          </Button>

          <Button className={classes.button} onClick={onImgClick}>
            <i className="far fa-image fa-lg" />
          </Button>
        </Card>
      </FormControl>

      {value && withPreview ? (
        <Card className={classes.cardPreview}>
          <CardContent>
            <ReactMarkdown source={value} renderers={{ code: CodeBlock }} />
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

MarkdownEditor.propTypes = {
  withPreview: PropTypes.bool,
  text: PropTypes.string,
  setText: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
  label: PropTypes.string
}

export default MarkdownEditor
