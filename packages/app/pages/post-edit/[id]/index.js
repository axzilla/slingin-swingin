import PropTypes from 'prop-types'
import { getPostById } from '@services/post'

import { isNotLoggedIn } from '@utils/initialize'
import { Main as MainLayout } from '@layouts'
import { PostEdit as PostEditView } from '@views'

function PostEdit({ post }) {
  return (
    <MainLayout>
      <PostEditView post={post} />
    </MainLayout>
  )
}

PostEdit.getInitialProps = async ctx => {
  isNotLoggedIn(ctx)

  const { id } = ctx.query
  const post = await getPostById(id)

  return { post: post.data }
}

PostEdit.propTypes = {
  post: PropTypes.object
}

export default PostEdit
