import showdown from 'showdown'

function htmlToMarkdown(content) {
  const converter = new showdown.Converter()

  const createdHtml = JSON.stringify(converter.makeMarkdown(content))
  return createdHtml
}

export default htmlToMarkdown
