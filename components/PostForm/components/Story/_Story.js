import React from 'react'
import PropTypes from 'prop-types'

import Quill from '@components/Quill'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import Divider from '@material-ui/core/Divider'

function PostForm({ text, setText, errors }) {
  async function onTextChange(value) {
    // value instead event.target.value - is quill specified
    setText(value)
  }

  return (
    <Card>
      <CardHeader title="Story" />
      <Divider />
      <CardContent>
        <div>
          <Quill
            error={errors && errors.text}
            value={text}
            onChange={onTextChange}
            placeholder="Write your story..."
          />
        </div>
      </CardContent>
    </Card>
  )
}

PostForm.propTypes = {
  text: PropTypes.string,
  setText: PropTypes.func,
  errors: PropTypes.object
}

export default PostForm
