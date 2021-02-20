const getEntities = (editorState, entityType = null) => {
  const content = editorState.getCurrentContent()
  const entities = []
  content.getBlocksAsArray().forEach(block => {
    let selectedEntity = null
    block.findEntityRanges(
      character => {
        if (character.getEntity() !== null) {
          const entity = content.getEntity(character.getEntity())
          if (!entityType || (entityType && entity.getType() === entityType)) {
            selectedEntity = {
              // entityKey: character.getEntity(),
              // blockKey: block.getKey(),
              // entity: content.getEntity(character.getEntity()),
              data: content.getEntity(character.getEntity()).getData(),
              type: content.getEntity(character.getEntity()).getType()
            }
            return true
          }
        }
        return false
      },
      (start, end) => {
        entities.push({ ...selectedEntity, start, end })
      }
    )
  })
  return entities
}

export default getEntities
