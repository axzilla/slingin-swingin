// Packages
import { EditorState, Modifier, SelectionState } from 'draft-js'

function trimFirstAndLastBlock(editorState) {
  // https://stackoverflow.com/questions/46802855/draft-js-how-to-trim-contents
  let currentContent = editorState.getCurrentContent()
  const firstBlock = currentContent.getBlockMap().first()
  const lastBlock = currentContent.getBlockMap().last()
  const firstBlockKey = firstBlock.getKey()
  const lastBlockKey = lastBlock.getKey()
  const firstAndLastBlockIsTheSame = firstBlockKey === lastBlockKey

  const textStart = firstBlock.getText()
  const trimmedTextStart = textStart.trimLeft()
  const lengthOfTrimmedCharsStart = textStart.length - trimmedTextStart.length

  let newSelection = new SelectionState({
    anchorKey: firstBlockKey,
    anchorOffset: 0,
    focusKey: firstBlockKey,
    focusOffset: lengthOfTrimmedCharsStart
  })

  currentContent = Modifier.replaceText(currentContent, newSelection, '')

  let newEditorState = EditorState.push(editorState, currentContent)

  let offset = 0

  if (firstAndLastBlockIsTheSame) {
    offset = lengthOfTrimmedCharsStart
  }

  const textEnd = lastBlock.getText()
  const trimmedTextEnd = textEnd.trimRight()
  // const lengthOfTrimmedCharsEnd = textEnd.length - trimmedTextEnd.length

  newSelection = new SelectionState({
    anchorKey: lastBlockKey,
    anchorOffset: trimmedTextEnd.length - offset,
    focusKey: lastBlockKey,
    focusOffset: textEnd.length - offset
  })

  currentContent = Modifier.replaceText(currentContent, newSelection, '')

  newEditorState = EditorState.push(editorState, currentContent)

  return newEditorState
}

export default trimFirstAndLastBlock
