import PropTypes from 'prop-types'
import { isNotLoggedIn } from '../../utils/initialize'
import { Main as MainLayout } from '../../layouts'
import { PostEdit as PostEditView } from '../../views'

function editPost({ id }) {
  return (
    <MainLayout>
      <PostEditView id={id} />
    </MainLayout>
  )
}

editPost.getInitialProps = ctx => {
  isNotLoggedIn(ctx)

  const { id } = ctx.query
  return { id }
}

editPost.propTypes = {
  id: PropTypes.object
}

export default editPost
