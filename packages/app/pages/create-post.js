import { isNotLoggedIn } from '../utils/initialize'
import { PostCreate } from '../views'

function postCreate() {
  return <PostCreate />
}

postCreate.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default postCreate
