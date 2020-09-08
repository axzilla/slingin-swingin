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
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default PostCreate
