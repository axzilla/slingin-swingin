import { isNotLoggedIn } from '../utils/initialize'
import PostCreate from '../components/post/PostCreate'

function postCreate() {
  return <PostCreate />
}

postCreate.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default postCreate
