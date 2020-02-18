import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

function rawToHtml(content) {
  const parsedJson = JSON.parse(content)
  const convertedRaw = convertFromRaw(parsedJson)
  const html = stateToHTML(convertedRaw)

  return html
}

export default rawToHtml
