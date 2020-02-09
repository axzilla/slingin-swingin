import showdown from 'showdown'

function markdownToHtml(content) {
  const converter = new showdown.Converter()

  const createdHtml = converter.makeHtml(JSON.parse(content))
  return createdHtml
}

export default markdownToHtml
