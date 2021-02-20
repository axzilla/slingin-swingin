// Packages
import { EditorState } from 'draft-js'

// Utils
import isEmpty from '@utils/isEmpty'

function removeEmptyBlocks(editorState) {
  // https://github.com/facebook/draft-js/issues/773#issuecomment-303961362
  let contentState = editorState.getCurrentContent()
  let blockMap = contentState.getBlockMap()
  const newBlockMap = blockMap.filter(block => {
    return !isEmpty(block.getText())
  })

  var newContentState = contentState.merge({
    blockMap: newBlockMap
  })

  const newEditorState = EditorState.push(editorState, newContentState, 'remove-range')
  return newEditorState
}

export default removeEmptyBlocks
