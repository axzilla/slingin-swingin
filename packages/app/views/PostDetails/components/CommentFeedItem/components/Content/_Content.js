// Packages
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js'

// Global Component
import DraftJsEditor from '@components/DraftJsEditor'

// DraftJs Plugins
import hashtagDecoratorPlugin from '@components/DraftJsEditor/plugins/hashtagDecoratorPlugin'
import hashtagEntityPlugin from '@components/DraftJsEditor/plugins/hashtagEntityPlugin'
import linkDecoratorPlugin from '@components/DraftJsEditor/plugins/linkDecoratorPlugin'
import linkEntityPlugin from '@components/DraftJsEditor/plugins/linkEntityPlugin'

function CommentFeedItemtext({ comment }) {
  const plugins = [
    linkEntityPlugin,
    hashtagEntityPlugin,
    linkDecoratorPlugin,
    hashtagDecoratorPlugin
  ]

  const decorators = new CompositeDecorator(plugins)

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(comment.contentRaw)), decorators)
  )

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(comment.contentRaw)), decorators)
    )
  }, [comment])

  return <DraftJsEditor readOnly editorState={editorState} setEditorState={setEditorState} />
}

CommentFeedItemtext.propTypes = {
  comment: PropTypes.object
}

export default CommentFeedItemtext
