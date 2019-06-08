// Packages
import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism'

// Material Styles
import { makeStyles } from '@material-ui/styles'

// Material Core
import { Card, CardContent, FormControl, Button, TextField, Typography } from '@material-ui/core'

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
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}

CodeBlock.defaultProps = {
  language: null
}

function MarkdownEditor({ withPreview, text, setText, onChange, value }) {
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

  function createBreakline() {
    setText(text + '  ')
  }

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      createBreakline()
    }
  }

  function onCodeClick() {
    const selected = window.getSelection().toString()

    if (selected) {
      setText(text.replace(selected, '```\n' + selected + '\n```'))
    } else {
      setText(text + mdStrings.code)
    }
  }

  function onBoldClick() {
    const selected = window.getSelection().toString()

    if (selected) {
      setText(text.replace(selected, `**${selected}**`))
    } else {
      setText(text + mdStrings.bold)
    }
  }

  function onItalicClick() {
    const selected = window.getSelection().toString()

    if (selected) {
      setText(text.replace(selected, `*${selected}*`))
    } else {
      setText(text + mdStrings.italic)
    }
  }

  function onUlClick() {
    const selected = window.getSelection().toString()

    if (selected) {
      setText(text.replace(selected, `- ${selected}`))
    } else {
      setText(text + mdStrings.ul)
    }
  }

  function onOlClick() {
    const selected = window.getSelection().toString()

    if (selected) {
      setText(text.replace(selected, `1. ${selected}`))
    } else {
      setText(text + mdStrings.ol)
    }
  }

  function onLinkClick() {
    setText(text + mdStrings.link)
  }

  function onQuoteClick() {
    const selected = window.getSelection().toString()

    if (selected) {
      setText(text.replace(selected, `> ${selected}`))
    } else {
      setText(text + mdStrings.quote)
    }
  }

  function onImgClick() {
    setText(text + mdStrings.img)
  }

  return (
    <>
      <FormControl fullWidth error>
        <TextField
          label="Kommentieren (Markdown)"
          margin="normal"
          multiline
          variant="outlined"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
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

      {text && withPreview ? (
        <Card className={classes.cardPreview}>
          <CardContent>
            <Typography>
              <ReactMarkdown source={text} renderers={{ code: CodeBlock }} />
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

MarkdownEditor.propTypes = {
  withPreview: PropTypes.bool,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default MarkdownEditor
