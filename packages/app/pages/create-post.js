import { isNotLoggedIn } from '../utils/initialize'
import PostCreate from '../views/post/PostCreate'

function postCreate() {
  return <PostCreate />
}

postCreate.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default postCreate
