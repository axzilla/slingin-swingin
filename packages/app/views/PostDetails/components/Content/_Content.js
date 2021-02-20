//  Packages
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js'

// DraftJs Plugins
import hashtagDecoratorPlugin from '@components/DraftJsEditor/plugins/hashtagDecoratorPlugin'
import hashtagEntityPlugin from '@components/DraftJsEditor/plugins/hashtagEntityPlugin'
import linkDecoratorPlugin from '@components/DraftJsEditor/plugins/linkDecoratorPlugin'
import linkEntityPlugin from '@components/DraftJsEditor/plugins/linkEntityPlugin'

// Global Component
import DraftJsEditor from '@components/DraftJsEditor'

function Content({ post }) {
  const plugins = [
    linkEntityPlugin,
    hashtagEntityPlugin,
    linkDecoratorPlugin,
    hashtagDecoratorPlugin
  ]

  const decorators = new CompositeDecorator(plugins)

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(post.contentRaw)), decorators)
  )

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(post.contentRaw)), decorators)
    )
  }, [post])

  return <DraftJsEditor readOnly editorState={editorState} setEditorState={setEditorState} />
}

Content.propTypes = {
  post: PropTypes.object
}

export default Content
