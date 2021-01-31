import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateToMarkdown } from 'draft-js-export-markdown'

import Title from './components/Title'
import TitleImage from './components/TitleImage'
import Tags from './components/Tags'

import DraftJsEditor from '@components/DraftJsEditor'

import { postCreate, postUpdate } from '@services/post'
import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

function PostForm({ post }) {
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [titleImage, setTitleImage] = useState(null)
  const [titleImagePreview, setTitleImagePreview] = useState(
    post && post.titleImage ? post.titleImage.secure_url : null
  )
  const [title, setTitle] = useState(post ? post.title : '')
  const [editorState, setEditorState] = useState(
    post
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(post.contentRaw)))
      : EditorState.createEmpty()
  )

  const [tags, setTags] = useState(post ? post.tags : [])
  const [tagsInput, setTagsInput] = useState('')

  async function onSubmit() {
    try {
      setIsLoading(true)
      const contentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const contentHtml = stateToHTML(editorState.getCurrentContent())
      const contentText = editorState.getCurrentContent().getPlainText().replace(/\s+/g, ' ').trim()
      const contentMarkdown = JSON.stringify(stateToMarkdown(editorState.getCurrentContent()))

      const formData = new FormData()
      formData.append('titleImage', titleImage)
      formData.append('title', title)
      formData.append('contentRaw', contentRaw)
      formData.append('contentHtml', contentHtml)
      formData.append('contentText', contentText)
      formData.append('contentMarkdown', contentMarkdown)
      formData.append('tags', tags)

      if (post) {
        formData.append('_id', post._id)
      }

      if (post) {
        const res = await postUpdate(formData)
        const updatedPost = res.data
        const { shortId, urlSlug } = updatedPost
        Router.push(`/post/${shortId}/${urlSlug}`)
      } else if (!post) {
        const res = await postCreate(formData)
        const createdPost = res.data
        const { shortId, urlSlug } = createdPost
        Router.push(`/post/${shortId}/${urlSlug}`)
      }
    } catch (error) {
      setErrors(error.response.data)
    }
    setIsLoading(false)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TitleImage
              setTitleImage={setTitleImage}
              titleImagePreview={titleImagePreview}
              setTitleImagePreview={setTitleImagePreview}
            />
          </Grid>
          <Grid item>
            <Title title={title} setTitle={setTitle} errors={errors} />
          </Grid>
          <Grid item>
            <DraftJsEditor
              height={200}
              editorState={editorState}
              setEditorState={setEditorState}
              error={errors && errors.content}
              placeholder="Write your story or question"
            />
          </Grid>
          <Grid item>
            <Tags
              tags={tags}
              setTags={setTags}
              tagsInput={tagsInput}
              setTagsInput={setTagsInput}
              errors={errors}
            />
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={onSubmit}
              fullWidth
              disabled={
                isLoading ||
                !title ||
                htmlRemove(rawToHtml(JSON.stringify(convertToRaw(editorState.getCurrentContent()))))
                  .length < 1
              }
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

PostForm.propTypes = {
  post: PropTypes.object
}

export default PostForm
