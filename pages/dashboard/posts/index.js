import { isNotLoggedIn } from '@utils/initialize'
import { Dashboard as DashboardLayout } from '@layouts'
import { DashboardPosts as DashboardPostsView } from '@views'

function posts() {
  return (
    <DashboardLayout>
      <DashboardPostsView />
    </DashboardLayout>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
