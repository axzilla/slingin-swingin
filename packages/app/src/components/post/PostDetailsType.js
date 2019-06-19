import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import { Chip } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  chip: {
    border: props => `2px solid ${props.color}`,
    borderRadius: '5px',
    marginBottom: theme.spacing(1)
  }
}))

function PostDetailsType({ post }) {
  let color

  // https://materialuicolors.co/ Level 200
  if (post.type === 'Tutorial') {
    color = '#F48FB1' // Pink 200
  } else if (post.type === 'Blogartikel') {
    color = '#B39DDB' // Purple 200
  } else if (post.type === 'Diskussion') {
    color = '#90CAF9' // Blue 200
  } else if (post.type === 'Idee') {
    color = '#80CBC4' // Teal 200
  } else if (post.type === 'Projekt') {
    color = '#A5D6A7' // Green 200
  } else if (post.type === 'Frage') {
    color = '#FFCC80' // Orange 200
  } else if (post.type === 'Fun') {
    color = '#FFE082' // Amber 200
  }

  const classes = useStyles({ color })

  return <Chip variant="outlined" label={post.type} className={classes.chip} />
}

PostDetailsType.propTypes = {
  post: PropTypes.object
}

export default PostDetailsType
