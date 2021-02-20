// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import { Link } from '@components'

function linkEntityStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
  }, callback)
}

function LinkEntityComponent(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <Link underlined variant="MuiLink" href={url.url} onClick={e => e.stopPropagation()}>
      {props.children}
    </Link>
  )
}

LinkEntityComponent.propTypes = {
  contentState: PropTypes.object,
  entityKey: PropTypes.string,
  children: PropTypes.node
}

const linkEntityPlugin = { strategy: linkEntityStrategy, component: LinkEntityComponent }

export default linkEntityPlugin
