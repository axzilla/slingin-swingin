// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { linkifyHashtag } from '../utils'

// MUI
import Typography from '@material-ui/core/Typography'

function hashtagDecoratorStrategy(contentBlock, callback) {
  const hashtags = linkifyHashtag.match(contentBlock.getText())
  hashtags && hashtags.map(hashtag => callback(hashtag.index, hashtag.lastIndex))
}

function HashtagDecoratorComponent(props) {
  return (
    <Typography display="inline" color="primary" data-offset-key={props.offsetKey}>
      {props.children}
    </Typography>
  )
}

HashtagDecoratorComponent.propTypes = {
  offsetKey: PropTypes.string,
  children: PropTypes.node
}

const hashtagDecoratorPlugin = {
  strategy: hashtagDecoratorStrategy,
  component: HashtagDecoratorComponent
}

export default hashtagDecoratorPlugin
