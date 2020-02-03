import PropTypes from 'prop-types'

import { isNotLoggedIn } from '../../../utils/initialize'
import { Main as MainLayout } from '../../../layouts'
import { PostEdit as PostEditView } from '../../../views'

function PostEdit({ id }) {
  return (
    <MainLayout>
      <PostEditView id={id} />
    </MainLayout>
  )
}

PostEdit.getInitialProps = ctx => {
  isNotLoggedIn(ctx)

  const { id } = ctx.query
  return { id }
}

PostEdit.propTypes = {
  id: PropTypes.object
}

export default PostEdit
