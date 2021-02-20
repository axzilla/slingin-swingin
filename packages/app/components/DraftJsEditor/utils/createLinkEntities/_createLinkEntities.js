// Packages
import { EditorState, Modifier, SelectionState } from 'draft-js'

// Utils
// DraftJs Utils
import { linkifyUrl, linkifyHashtag } from '../'

function createLinkEntities(editorState) {
  let contentState = editorState.getCurrentContent()

  editorState
    .getCurrentContent()
    .getBlockMap()
    .map(block => {
      const blockKey = block.getKey()
      const blockText = block.getText()

      const urlArray = linkifyUrl.match(blockText)

      if (urlArray !== null) {
        urlArray.map(url => {
          contentState = contentState.createEntity('LINK', 'MUTABLE', { url })
          const entityKey = contentState.getLastCreatedEntityKey()

          const contentStateWithEntity = Modifier.applyEntity(
            contentState,
            new SelectionState({
              anchorKey: blockKey,
              anchorOffset: url.index,
              focusKey: blockKey,
              focusOffset: url.lastIndex
            }),
            entityKey
          )

          editorState = EditorState.push(editorState, contentStateWithEntity, 'apply-entity')
          const newEditorState = editorState
          contentState = newEditorState.getCurrentContent()
        })
      }

      const hashtagArray = linkifyHashtag.match(blockText)
      if (hashtagArray !== null) {
        hashtagArray.map(hashtag => {
          contentState = contentState.createEntity('HASHTAG', 'MUTABLE', { ...hashtag })
          const entityKey = contentState.getLastCreatedEntityKey()

          const contentStateWithEntity = Modifier.applyEntity(
            contentState,
            new SelectionState({
              anchorKey: blockKey,
              anchorOffset: hashtag.index,
              focusKey: blockKey,
              focusOffset: hashtag.lastIndex
            }),
            entityKey
          )

          editorState = EditorState.push(editorState, contentStateWithEntity, 'apply-entity')
          const newEditorState = editorState
          contentState = newEditorState.getCurrentContent()
        })
      }
    })

  const newEditorState = editorState
  return newEditorState
}

export default createLinkEntities
