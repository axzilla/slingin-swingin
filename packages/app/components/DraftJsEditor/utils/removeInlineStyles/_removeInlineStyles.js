// Packages
import { EditorState } from 'draft-js'

function removeInlineStyles(editorState) {
  // https://github.com/facebook/draft-js/issues/278#issuecomment-207523958
  let contentState = editorState.getCurrentContent()
  let blockMap = contentState.getBlockMap()
  const newBlockMap = blockMap.map(block => {
    const characterList = block.getCharacterList()
    const updatedCharacterList = characterList.map(c => c.set('style', c.get('style').clear()))

    const updatedBlock = block.set('characterList', updatedCharacterList)
    return updatedBlock
  })

  var newContentState = contentState.merge({
    blockMap: newBlockMap
  })

  const newEditorState = EditorState.push(editorState, newContentState, 'remove-range')
  return newEditorState
}

export default removeInlineStyles
