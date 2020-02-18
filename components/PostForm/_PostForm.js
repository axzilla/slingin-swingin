import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Title from './components/Title'
import TitleImage from './components/TitleImage'
import Tags from './components/Tags'
import Content from './components/Content'

import { postCreate, postUpdate } from '@services/post'

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
  const [content, setContent] = useState(post ? post.content : '')
  const [tags, setTags] = useState(post ? post.tags : [])
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    if (post) {
      setContent(post.content)
    } else {
      setContent('')
    }
  }, [])

  async function onSubmit() {
    try {
      console.log(content)
      setIsLoading(true)

      const formData = new FormData()
      formData.append('titleImage', titleImage)
      formData.append('title', title)
      formData.append('content', JSON.stringify(content))
      formData.append('tags', tags)

      if (post) {
        formData.append('id', post._id)
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
    <Card>
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
            <Content content={content} setContent={setContent} errors={errors} />
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
              disabled={isLoading}
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
