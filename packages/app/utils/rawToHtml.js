import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

let options = {
  entityStyleFn: entity => {
    const entityType = entity.get('type').toLowerCase()
    if (entityType === 'hashtag') {
      const data = entity.getData()
      return {
        element: 'h1',
        attributes: {
          src: data.src
        },
        style: { maxWidth: '100%' }
      }
    }
  }
}

function rawToHtml(content) {
  const parsedJson = JSON.parse(content)
  const convertedRaw = convertFromRaw(parsedJson)
  const html = stateToHTML(convertedRaw, options)

  return html
}

export default rawToHtml
