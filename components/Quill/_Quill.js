import React from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

function Quill({ ...rest }) {
  return <ReactQuill modules={modules} formats={formats} theme="snow" {...rest} />
}

export default Quill
