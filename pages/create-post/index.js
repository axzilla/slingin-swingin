import { isNotLoggedIn } from '@utils/initialize'
import { Main as MainLayout } from '@layouts'
import { PostCreate as PostCreateView } from '@views'

function postCreate() {
  return (
    <MainLayout>
      <PostCreateView />
    </MainLayout>
  )
}

postCreate.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default postCreate
