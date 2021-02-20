// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { linkifyUrl } from '../utils'

// MUI
import Typography from '@material-ui/core/Typography'

function linkDecoratorStrategy(contentBlock, callback) {
  const urls = linkifyUrl.match(contentBlock.getText())
  urls && urls.map(url => callback(url.index, url.lastIndex))
}

function LinkDecoratorComponent(props) {
  return (
    <Typography display="inline" color="primary" data-offset-key={props.offsetKey}>
      {props.children}
    </Typography>
  )
}

LinkDecoratorComponent.propTypes = {
  offsetKey: PropTypes.string,
  children: PropTypes.node
}

const linkDecoratorPlugin = { strategy: linkDecoratorStrategy, component: LinkDecoratorComponent }

export default linkDecoratorPlugin
