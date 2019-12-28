import { isNotLoggedIn } from '../../utils/initialize'

import PropTypes from 'prop-types'
import PostEdit from '../../components/post/PostEdit'

function editPost({ id }) {
  return <PostEdit id={id} />
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
