import React from 'react'
import PropTypes from 'prop-types'

import slugify from '@utils/slugify'
import TextField from '@components/TextField'
import Chip from '@components/Chip'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

// import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  chip: { margin: theme.spacing(0.5) },
  button: { margin: '20px 0' },
  media: { height: '140px' }
}))

function Tags({ tags, setTags, tagsInput, setTagsInput, errors }) {
  const classes = useStyles()

  function handleTagsInputChange(event) {
    setTagsInput(slugify(event.target.value))
  }

  function handleTagsKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (!tags.includes(tagsInput)) {
        setTags([...tags, tagsInput])
      }

      setTagsInput('')
    }
  }

  function handleTagDelete(i) {
    setTags([...tags.slice(0, i), ...tags.slice(i + 1)])
  }

  return (
    <>
      <Box mb={2}>
        <TextField
          error={errors && errors.tags}
          type="tags"
          name="tags"
          value={tagsInput}
          onChange={handleTagsInputChange}
          onKeyDown={handleTagsKeyPress}
        />
      </Box>
      <Grid>
        {tags &&
          tags.map((tag, i) => {
            return (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleTagDelete(i)}
                className={classes.chip}
                variant="outlined"
              />
            )
          })}
      </Grid>
    </>
  )
}

Tags.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func,
  tagsInput: PropTypes.string,
  setTagsInput: PropTypes.func,
  errors: PropTypes.object
}

export default Tags
