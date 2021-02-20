// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import { Link } from '@components'

function hashtagEntityStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'HASHTAG'
  }, callback)
}

function HashtagEntityComponent(props) {
  const { hashtag } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <Link
      underlined
      color="primary"
      href="/posts/t/[tag]"
      as={`/posts/t/${hashtag}`}
      onClick={e => e.stopPropagation()}
    >
      {props.children}
    </Link>
  )
}

HashtagEntityComponent.propTypes = {
  contentState: PropTypes.object,
  entityKey: PropTypes.string,
  children: PropTypes.node
}

const hashtagEntityPlugin = { strategy: hashtagEntityStrategy, component: HashtagEntityComponent }

export default hashtagEntityPlugin
