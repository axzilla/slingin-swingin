import { isNotLoggedIn } from '@utils/initialize'
import { Main as MainLayout } from '@layouts'
import { PostCreate as PostCreateView } from '@views'

function PostCreate() {
  return (
    <MainLayout>
      <PostCreateView />
    </MainLayout>
  )
}

PostCreate.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default PostCreate
