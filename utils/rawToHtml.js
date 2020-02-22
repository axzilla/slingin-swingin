import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

let options = {
  // blockRenderers: {
  //   unstyled: block => {
  //     if (block.getText()) {
  //       return `<p class="MuiTypography-root MuiTypography-body1">${block.getText()}</p>`
  //     } else {
  //       return '<p class="MuiTypography-root MuiTypography-body1"><br></p>'
  //     }
  //   }
  // }
}

function rawToHtml(content) {
  const parsedJson = JSON.parse(content)
  const convertedRaw = convertFromRaw(parsedJson)
  const html = stateToHTML(convertedRaw, options)

  return html
}

export default rawToHtml
